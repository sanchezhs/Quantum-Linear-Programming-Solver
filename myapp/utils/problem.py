from qiskit_ibm_runtime import Sampler
from sympy import sympify
from qiskit_optimization.converters import QuadraticProgramToQubo
from qiskit_optimization.algorithms.minimum_eigen_optimizer import MinimumEigenOptimizationResult
from qiskit.algorithms.optimizers import COBYLA
from qiskit.primitives import Sampler
from qiskit_optimization.algorithms import MinimumEigenOptimizer
from qiskit_optimization import QuadraticProgram
from qiskit.algorithms.minimum_eigensolvers import QAOA
from .qiskit_conv import ToQiskitConverter
from .optimize_problem import OptimizeProblem
from .result import Result


class Problem():

    def __init__(self, objetive: str, constraints: str, type: str, upperbound: str, p: str) -> None:
        self.objetive = objetive
        self.constraints = constraints
        self.type = type
        self.upperbound = int(upperbound)
        self.p = int(p)
        self.sense = {'=': 'EQ', '>=': 'GE', '<=': 'LE', '>': 'G', '<': 'L'}
        self.circuit = None

    def solve(self):
        # Convert to QuadraticProgram
        qp = ToQiskitConverter(self).to_qiskit()
        qubo = QuadraticProgramToQubo().convert(qp)
        print(qubo.prettyprint())
        # Get ising model and circuit
        # ising_model, qubo = self.get_ising(qp)
        best_solution, best_theta, optimized_circuit = OptimizeProblem(
            qubo, qp, self.p, self.type).solve()

        # best_sol, best_params, circuit = self.qaoa_optimize(qp, build_circuit)
        res = Result(best_solution, best_theta, optimized_circuit, qubo, qp)
        # optimized = self.qaoa_optimize(qp, build_circuit)
        return res.get_results()
        # Optimize
        # Get results
        # result = Result(optimized, ising_model, sampler, qubo, qp)

        # return result.get_results()


"""     def qaoa_optimize(self, qp: QuadraticProgram, build_circuit: BuildCircuit) -> MinimumEigenOptimizationResult:
        
        best_sol, best_params, circuit = build_circuit.solve()

        #sampler = Sampler(options={'shots': 10000})
        #qaoa_mes = QAOA(sampler=sampler, optimizer=COBYLA(maxiter=5000), initial_state=self.circuit, initial_point=[1. for _ in range(2*self.p)], reps=self.p)
        #qaoa = MinimumEigenOptimizer(qaoa_mes)
        #qaoa_result = qaoa.solve(qp)
        #print(qaoa_result)

        return best_sol, best_params, circuit
        
        #return qaoa_result, sampler """
