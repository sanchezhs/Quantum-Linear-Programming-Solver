from rest_framework import serializers
from qiskit_optimization.converters import QuadraticProgramToQubo
from qiskit_optimization.algorithms.minimum_eigen_optimizer import MinimumEigenOptimizationResult
from qiskit.algorithms.optimizers import COBYLA
from qiskit.primitives import Sampler
from qiskit_optimization.algorithms import MinimumEigenOptimizer
from qiskit_optimization import QuadraticProgram
from qiskit_optimization.runtime import QAOAClient
from qiskit.algorithms.minimum_eigensolvers import QAOA
from .qiskit_conv import ToQiskitConverter
from .optimize_problem import OptimizeProblem
from .result import Result
from .qiskit_result import QiskitResult
from qiskit import QuantumCircuit
from qiskit import IBMQ
from qiskit_ibm_runtime import QiskitRuntimeService
import numpy as np


class Problem():

    def __init__(self, objetive: str, constraints: str, type: str, upperbound: str, lowerBound: str, seed: str, p: str) -> None:
        self.objetive = objetive
        self.constraints = constraints
        self.type = type
        self.upperbound = int(upperbound)
        self.lowerBound = int(lowerBound)
        self.seed = int(seed)
        self.rng = np.random.RandomState(seed=self.seed)
        self.p = int(p)
        self.sense = {'=': 'EQ', '>=': 'GE', '<=': 'LE', '>': 'G', '<': 'L'}
        self.circuit = None
        self.theta = None

    def cobyla_data(self, x: int, theta: np.ndarray, f: float, d: dict) -> None:
        self.theta = theta

    def solve(self, mode='qiskit'):
        if mode != 'qiskit':
            return self._solve_manual()
        return self._solve_qiskit()

    def _solve_qiskit(self):
        qp, max_value = ToQiskitConverter(self).to_qiskit()
        sampler = Sampler(options={'seed': self.seed})
        initial_point = [self.rng.random() + (max_value / (2 * np.pi))
                         for _ in range(0, 2 * self.p)]
        qaoa_mes = QAOA(sampler=sampler, optimizer=COBYLA(
            rhobeg=0.5, disp=True), initial_point=initial_point, callback=self.cobyla_data, reps=self.p)
        qaoa = MinimumEigenOptimizer(qaoa_mes)
        qaoa_result = qaoa.solve(qp)

        print(qaoa_result)
        results = QiskitResult(qaoa_result, qp, sampler,
                               self.theta).get_results()

        return results

    def _solve_manual(self) -> dict:
        # Convert to QuadraticProgram
        qp, max_value = ToQiskitConverter(self).to_qiskit()
        conv = QuadraticProgramToQubo()
        qubo = conv.convert(qp)
        best_solution, best_theta, optimized_circuit = OptimizeProblem(conv,
                                                                       qubo, qp, self.p, self.type, max_value, self.seed).solve()

        if not best_solution:
            raise serializers.ValidationError({'errors': [
                'Solution not found']})

        res = Result(best_solution, best_theta, optimized_circuit, qubo, qp)
        return res.get_results()

    def solve_runtime(self):
        qp, max_value = ToQiskitConverter(self).to_qiskit()
        token = '4028a768ca1626c7d921c2872156924aa8f740ebd43cd7cb18f44a51edb5f2a781dcc40419fcdb28749f04ffa8e31d819e258142766f2c9b7df29796f099f932'
        try:
            provider = IBMQ.enable_account(token)
        except:
            provider = IBMQ.load_account()
        QiskitRuntimeService.save_account(
            overwrite=True, channel="ibm_quantum", token=token)
        # backend = QiskitRuntimeService().least_busy( simulator=False).name
        backend = 'ibmq_qasm_simulator'
        initial_point = [self.rng.random() + (max_value / (2 * np.pi))
                         for _ in range(0, 2 * self.p)]
        qaoa_mes = QAOAClient(provider=provider, backend=provider.get_backend(
            backend), initial_point=initial_point, reps=self.p)
        qaoa = MinimumEigenOptimizer(qaoa_mes)
        qaoa_result = qaoa.solve(qp)
        print('RUNTIME: ', qaoa_result)
