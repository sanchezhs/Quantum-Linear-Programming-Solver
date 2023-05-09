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
from .buid_circuit import BuildCircuit
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
        # Get ising model and circuit
        #ising_model, qubo = self.get_ising(qp)
        build_circuit = BuildCircuit(qubo, qp, self.p, self.type)
        best_sol, best_params, circuit = self.qaoa_optimize(qp, build_circuit)
        res = Result(best_sol, best_params, circuit, qubo, qp)
        
        return res.get_results()
        # Optimize
        #optimized = self.qaoa_optimize(qp)
        # Get results
        #result = Result(optimized, ising_model, sampler, qubo, qp)

        #return result.get_results()

    def get_ising(self, qp) -> tuple:
        """ Get ising model and circuit from QuadraticProgram
        Args:
            qp (QuadraticProgram): QuadraticProgram
        Returns:
            tuple: ising model and circuit
        """
        conv = QuadraticProgramToQubo()
        qubo = conv.convert(qp)
        # Convert from Qubo to Ising
        ising_model = qubo.to_ising()
        return ising_model, qubo

    def qaoa_optimize(self, qp: QuadraticProgram, build_circuit: BuildCircuit) -> MinimumEigenOptimizationResult:
        """ Optimize the Ising model using QAOA
        Args:
            qp (QuadraticProgram): QuadraticProgram
        Returns:
            MinimumEigenOptimizationResult: solution
        """
        best_sol, best_params, circuit = build_circuit.solve()
        return best_sol, best_params, circuit
        
        #sampler = Sampler(options={'shots': 10000})
        #qaoa_mes = QAOA(sampler=sampler, optimizer=COBYLA(maxiter=5000), initial_state=self.circuit, initial_point=[1. for _ in range(2*self.p)], reps=self.p)
        #qaoa = MinimumEigenOptimizer(qaoa_mes)
        #qaoa_result = qaoa.solve(qp)
        #return qaoa_result, sampler
        
        
        





