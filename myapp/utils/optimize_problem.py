import numpy as np
import sympy as sp
from qiskit_ibm_runtime import QiskitRuntimeService, Sampler
from qiskit import Aer
from sympy import sympify
from qiskit_optimization import QuadraticProgram
from qiskit_optimization.converters import QuadraticProgramToQubo
from scipy.optimize import minimize
from .build_circuit import BuildCircuit


class OptimizeProblem():
    def __init__(self,
                 qubo: QuadraticProgram,
                 qp: QuadraticProgram,
                 p: int,
                 type: str) -> None:
        self.qubo = qubo
        self.original_qp = qp
        self.p = p
        self.type = type
        self.ising = qubo.to_ising()
        self.circuit = None
        self.nqubits = len(qubo.variables)
        self.backend = Aer.get_backend('qasm_simulator')
        self.shots = 7000

    def execute_circuit(self, theta):
        self.circuit = BuildCircuit(
            self.nqubits, self.ising, theta, self.p).build()
        histogram = self.backend.run(
            self.circuit, shots=self.shots).result().get_counts()
        return histogram

    def evaluate(self, sample):
        sample = str(sample)
        float_array = np.array([float(bit) for bit in sample])
        return self.qubo.objective.evaluate(float_array)

    def cost(self):
        def solution_energy(theta) -> float:
            histogram = self.execute_circuit(theta)
            reversed = self.invert_counts(histogram)
            energy = 0
            total_counts = 0
            for sample, count in reversed.items():
                if self.is_feasible(sample):
                    total_counts += count
                    energy += self.evaluate(sample) * count
            return energy / total_counts 
        return solution_energy

    def to_min(self):
        obj = sp.sympify(str(self.qubo.objective).split('minimize')[1].replace('@', '_'))
        terms = obj.as_coeff_add()[1]
        for term in terms:
            mult = term.as_coeff_mul()
            vars = mult[1]
            if len(vars) == 1:
                obj = obj.subs({vars[0]: -vars[0]})
        return obj

    def solve(self):
        #if self.type == 'minimize':
        #    self.qubo = self.to_min()
        best_theta = self.optimize()
        all_solutions = self.execute_circuit(best_theta.x)
        
        self.execute_on_real_device(best_theta.x)
        
        all_solutions = self.invert_counts(all_solutions)
        best = sorted(all_solutions.items(), key=lambda x: x[1], reverse=True)
        best_interpreted = self.filtar_soluciones(best)
        print('BEST: ', best_interpreted, ' ',
              best_theta, ', x= ', best_theta.x)
        # self.execute_on_real_device(best_theta.x) ####
        return best_interpreted, best_theta, self.circuit

    def optimize(self):
        init = [1 for _ in range(0, 2 * self.p)]
        cost = self.cost()
        return minimize(cost, init, method='COBYLA', options={'maxiter': self.shots, 'disp': True})

    def is_feasible(self, sample):
        return self.original_qp.is_feasible(self.interpret(sample))

    def interpret(self, sample):
        conv = QuadraticProgramToQubo()
        _ = conv.convert(self.original_qp)
        x = np.array([int(bit) for bit in str(sample)])
        return conv.interpret(x)

    def filtar_soluciones(self, all_solutions):
        conv = QuadraticProgramToQubo()
        _ = conv.convert(self.original_qp)
        buenas = {}
        for sol in all_solutions:
            x = np.array([int(bit) for bit in str(sol[0])])
            x_int = conv.interpret(x)
            if self.original_qp.is_feasible(x_int):
                x_int_tuple = tuple(x_int)
                if x_int_tuple not in buenas:
                    buenas[x_int_tuple] = 0
                buenas[x_int_tuple] += int(sol[1])

        return buenas

    def invert_counts(self, counts):
        return {k[::-1]: v for k, v in counts.items()}

    def execute_on_real_device(self, theta):
        service = QiskitRuntimeService(
            channel="ibm_quantum", token="4028a768ca1626c7d921c2872156924aa8f740ebd43cd7cb18f44a51edb5f2a781dcc40419fcdb28749f04ffa8e31d819e258142766f2c9b7df29796f099f932")
        backend = service.get_backend("ibmq_qasm_simulator")
        #circuit = self.build_circuit(theta)
        circuit =  BuildCircuit(
            self.nqubits, self.ising, theta, self.p).build()
        sampler = Sampler(session=backend)
        job = sampler.run(circuit)
        res = job.result()
        print('IBM simulator: ', res)
        #return res
