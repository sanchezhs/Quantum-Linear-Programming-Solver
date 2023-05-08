import random
import numpy as np
from qiskit import Aer
from qiskit import QuantumCircuit, QuantumRegister
from sympy import sympify
from qiskit_optimization import QuadraticProgram
from qiskit_optimization.converters import IntegerToBinary
from scipy.optimize import minimize
import sympy
import re

class BuildCircuit():
    def __init__(self,
                 qubo: QuadraticProgram,
                 qp: QuadraticProgram,
                 p: int,
                 type: str) -> None:
        self.qubo = qubo
        self.original_qp = qp
        self.variables = qubo.variables
        self.ising = qubo.to_ising()
        self.p = p
        self.type = type
        self.backend = Aer.get_backend('qasm_simulator')
        print(self.qubo.prettyprint())
        
    def problem_hamiltonian(self, pauli, circuit, gamma, j) -> QuantumCircuit:
        pauli_list = pauli[0].primitive.to_list()
        
        for pauli in pauli_list:
            op, coef = pauli[0], pauli[1]
            lqubit = []
            for i, c in enumerate(op):
                if c == 'Z':
                    lqubit.append(i)
                    
            if len(lqubit) == 1:
                circuit.rz(2 *  gamma[j], lqubit[0])
            elif len(lqubit) == 2:
                circuit.rzz(2 * gamma[j], lqubit[0], lqubit[1])


        return circuit


    def build_circuit(self, params) -> QuantumCircuit:
        nqubits = len(self.qubo.variables)
        qreg_q = QuantumRegister(nqubits, 'q')
        circuit = QuantumCircuit(qreg_q)
        beta = params[:self.p]
        gamma = params[self.p:]
        
        # Apply Hadamard gate to all qubits
        for i in range(0,nqubits):
            circuit.h(qreg_q[i])
            
        # Repeat p times
        for j in range(0, self.p):
            circuit.barrier()
            
            # Apply problem hamiltonian
            self.problem_hamiltonian(self.ising, circuit, gamma, j)
            circuit.barrier()
            
            # Apply mixer hamiltonian
            for i in range(0, nqubits):
                circuit.rx(2 * beta[j], qreg_q[i])
            
        circuit.measure_all()
        return circuit
    
    def execute_circuit(self, params):
        circuit = self.build_circuit(params)
        self.circuit = circuit
        #self.print_circuit()
        histogram = self.backend.run(circuit, shots=2500).result().get_counts()
        return histogram
        
    def evaluate(self, sample):
        obj = str(self.qubo.objective).split('minimize')[1]
        obj = obj.replace('@', '_')
        obj = sympy.sympify(obj)
        constant = obj.as_coeff_add()[0]
        obj = obj - constant
        vars_names = [var.name for var in self.variables]
        vars_names = [var.replace('@', '_') for var in vars_names]
        solucion = [int(b, base=2) for b in sample]
        subs = dict(zip(vars_names, solucion))
        substutido = obj.subs(subs)
        return substutido if self.type == "maximize" else -substutido
        
                
    def invert_counts(self, counts):
        return {k[::-1]:v for k, v in counts.items()}
        
    def cost (self):
        def solution_energy(params) -> float:
            histogram = self.execute_circuit(params)
            reversed = self.invert_counts(histogram)
            #print(params)
            energy = 0
            total_counts = 0
            for sample, count in reversed.items():
                #if self.is_feasible(sample):
                    total_counts += count
                    energy += self.evaluate(sample) * count
                    #print('Interpret: ', self.interpret(sample))
            #print('\tresult: ', int(energy / total_counts))
            
            # minimize or maximize depending on the problem
            return energy / total_counts
            if self.type == "maximize":
                return energy / total_counts
            else:
                return -energy / total_counts
        
        return solution_energy        
    

                
    def solve(self):
        best_params = self.optimize()
        all_solutions = self.execute_circuit(best_params.x)
        all_solutions = self.invert_counts(all_solutions)
        best = sorted(all_solutions.items(), key=lambda x: x[1], reverse=True)
        best_interpreted = self.filtar_soluciones(best)
        print('BEST: ', best_interpreted, ' ', best_params)
        self.print_circuit()
        
        return best_interpreted, best_params, self.circuit
        

    def optimize(self):
        init = [random.random() for _ in range(2 * self.p)]
        cost = self.cost()
        return minimize(cost, init, method='COBYLA', options={'maxiter': 2500, 'disp': True})

    def print_circuit(self):
        print(self.circuit.draw('text'))

    def get_circuit(self) -> QuantumCircuit:
        return self.circuit

    def is_feasible(self, sample):
        conv = IntegerToBinary()
        _ = conv.convert(self.original_qp)
        x = np.array([int(bit) for bit in str(sample)])
        return self.original_qp.is_feasible(conv.interpret(x))

    def interpret(self, sample):
        conv = IntegerToBinary()
        _ = conv.convert(self.original_qp)
        x = np.array([int(bit) for bit in str(sample)])
        return conv.interpret(x)

    def filtar_soluciones(self, all_solutions):
        conv = IntegerToBinary()
        _ = conv.convert(self.original_qp)
        buenas = {}
        for sol in all_solutions:
            print(sol)
            x = np.array([int(bit) for bit in str(sol[0])])
            x_int = conv.interpret(x)
            print(x_int)
            if self.original_qp.is_feasible(x_int):
                if tuple(x_int) not in buenas:
                    buenas[tuple(x_int)] = 0
                buenas[tuple(x_int)] += int(sol[1])

            
        return buenas
          
          
          
"""     def evaluate(self, sample):
        aux = QuadraticProgram()
        print(self.qubo.objective ) 
        vars_names = [var.name for var in self.variables]
        solucion = [int(b, base=2) for b in sample]
        subs = dict(zip(vars_names, solucion))
        print(subs)
        aux = self.qubo.substitute_variables(constants=subs)
        print('RES: ', aux.objective.constant)
        return int(aux.objective.constant)  """            
    
"""     def cost (self):
        def solution_energy(params) -> float:
            histogram = self.execute_circuit(params)
            
            energy = 0
            total_counts = 0
            for sample, count in histogram.items():
                min_energy = sorted(histogram.items(), key=lambda x: x[1])
                total_counts += count
                energy += self.evaluate(sample) * count
                print('Sample: ', sample, 'Average: ', energy / total_counts, 'Params: ', params)
            return energy / total_counts
        
        return solution_energy """    