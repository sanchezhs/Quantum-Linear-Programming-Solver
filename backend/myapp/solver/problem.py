from rest_framework import serializers
from qiskit_optimization.converters import QuadraticProgramToQubo
from qiskit_optimization.algorithms.minimum_eigen_optimizer import MinimumEigenOptimizationResult
from qiskit.algorithms.optimizers import COBYLA
from qiskit.primitives import Sampler
from qiskit_optimization.algorithms import MinimumEigenOptimizer
from qiskit_optimization import QuadraticProgram
from qiskit_optimization.runtime import QAOAClient
from qiskit.algorithms.minimum_eigensolvers import QAOA
from .result.qiskit_result import QiskitResult
from .result.manual_result import ManualResult  
from .converter.qiskit_conv import ToQiskitConverter
from .optimization.optimize_problem import OptimizeProblem  

from qiskit import IBMQ
from qiskit_ibm_runtime import QiskitRuntimeService
import numpy as np


class Problem():
    """
    This class is responsible for solving the problem.
    There are two different methods depending on 'simulator' parameter.
    """

    def __init__(self, objetive: str, constraints: str, type: str, upperbound: str, lowerBound: str, seed: str, depth: str, shots: str, simulator: str, token: str) -> None:
        """
        Constructor
        Args:
            objetive (str):  Objetive function
            constraints (str): Constraints
            type (str): Sense of optimization
            upperbound (str): Upper bound for binarization
            lowerBound (str): Lower bound for binarization
            seed (str): Seed for random number generator
            depth (str): Depth of the circuit (layers)
            simulator (str): Simulator or runtime
        """
        self.objetive = objetive
        self.constraints = constraints
        self.type = type
        self.upperbound = int(upperbound)
        self.lowerBound = int(lowerBound)
        self.seed = int(seed)
        self.shots = int(shots)
        self.simulator = simulator
        self.token = token
        self.rng = np.random.RandomState(seed=self.seed)
        self.depth = int(depth)
        self.sense = {'=': 'EQ', '>=': 'GE', '<=': 'LE', '>': 'G', '<': 'L'}
        self.circuit = None
        self.theta = None



    def solve(self, mode='qiskit'):
        if mode == 'manual':
            return self._solve_manual()
        elif mode == 'qiskit' and self.simulator:
            return self._solve_qiskit()
        elif mode == 'qiskit' and not self.simulator:
            return self.solve_runtime()

    def _solve_qiskit(self):
        """ Solve the problem using QAOA and other classes from qiskit_optimization

        Returns:
            dict: Dictionary with the results to be send to the frontend
        """
        # Convert to Quadratic Program
        qp, max_value = ToQiskitConverter(self).to_qiskit()
        
        # Initialize Sampler to get circuit later
        sampler = Sampler(options={'seed': self.seed, 'shots': self.shots})
        
        # Initialize initial point
        initial_point = [self.rng.random() + (max_value / (2 * np.pi))
                         for _ in range(0, 2 * self.depth)]
        
        # Initialize QAOA
        qaoa_mes = QAOA(sampler=sampler, optimizer=COBYLA(
            rhobeg=0.5, disp=True), initial_point=initial_point, callback=self.cobyla_callback, reps=self.depth)
        
        # Solve using MinimumEigenOptimizer
        qaoa = MinimumEigenOptimizer(qaoa_mes)
        qaoa_result = qaoa.solve(qp)

        # Return results
        print(qaoa_result)
        
        return QiskitResult(qaoa_result, qp, sampler,
                               self.theta).get_results()

    def _solve_manual(self) -> dict:
        """ Solve the problem using the manual approach

        Raises:
            serializers.ValidationError: Solution not found

        Returns:
            dict:  Dictionary with the results
        """
        
        # Convert to QuadraticProgram
        qp, max_value = ToQiskitConverter(self).to_qiskit()
        
        # Convert to QUBO
        conv = QuadraticProgramToQubo()
        qubo = conv.convert(qp)
        
        # Optimize
        best_solution, best_theta, optimized_circuit = OptimizeProblem(conv,
                                                                       qubo, qp, self.depth, self.type, max_value, self.shots, self.seed, self.token).solve()
        # Check if solution was found
        if not best_solution:
            raise serializers.ValidationError({'errors': [
                'Solution not found']})
            
        # Return results
        return ManualResult(best_solution, best_theta, optimized_circuit, qubo, qp).get_results()

    def solve_runtime(self):
        """ Solve the problem using QAOA runtime
        """
        
        # Convert to QuadraticProgram
        qp, max_value = ToQiskitConverter(self).to_qiskit()
        try:
            provider = IBMQ.enable_account(self.token)
        except:
            provider = IBMQ.load_account()

        try:
            backend = QiskitRuntimeService(channel='ibm_quantum', token=self.token).least_busy(simulator=False).name
        except:
            raise serializers.ValidationError({'token': 'Token is not valid'})

        initial_point = [self.rng.random() + (max_value / (2 * np.pi)) for _ in range(0, 2 * self.depth)]

        qaoa_mes = QAOAClient(
            provider=provider,
            backend=provider.get_backend(backend),
            initial_point=initial_point,
            callback=self.cobyla_callback,
            reps=self.depth,
            shots=self.shots
            )

        qaoa_result = MinimumEigenOptimizer(qaoa_mes).solve(qp)
        return QiskitResult(qaoa_result, qp, None, self.theta, self.simulator).get_results()


    
    def cobyla_callback(self, x: int, theta: np.ndarray, f: float, d: dict) -> None:
        """ Callback function for COBYLA to access the optimization parameters
        Args:
            x (int):  evaluation count
            theta (np.ndarray): the optimizer parameters for the ansatz
            f (float): the evaluated mean
            d (dict): standard deviation
        """
        self.theta = theta    