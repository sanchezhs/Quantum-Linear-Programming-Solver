import base64
from qiskit_ibm_runtime import  Sampler
from sympy import sympify
from qiskit_optimization.algorithms.minimum_eigen_optimizer import MinimumEigenOptimizationResult
from typing import List, Tuple
from qiskit.primitives import Sampler
from qiskit_optimization.algorithms import (
    SolutionSample,
    OptimizationResultStatus,
)
from qiskit.opflow import OperatorBase
from qiskit_optimization import QuadraticProgram
from qiskit.visualization import plot_histogram
from typing import List, Tuple
import numpy as np


class Result:
    def __init__(self,
                 qaoa_result: MinimumEigenOptimizationResult,
                 ising_model: Tuple[OperatorBase, float],
                 sampler: Sampler,
                 qubo: QuadraticProgram,
                 qp: QuadraticProgram) -> None:
        self.qaoa_result = qaoa_result
        self.ising_model = ising_model
        self.sampler = sampler
        self.qubo = qubo
        self.original = qp

    def save_circuit(self, circuit, filename):
        circuit.decompose().decompose().draw('mpl', filename=filename,
                                plot_barriers=False, initial_state=True)
        with open(filename, 'rb') as file:
            enconded_string = base64.b64encode(file.read()).decode('utf-8')
        return enconded_string

    def get_results(self):
        mean, std, encoded_histogram = self.get_mean_and_std(self.qaoa_result)

        encoded = self.save_circuit(self.sampler.circuits[0], './circuit.png')
        return {
            'details': self.qaoa_result.prettyprint(),
            # 'ising': self.ising_model[0].settings,
            'num_qubits': self.sampler.circuits[0].num_qubits,
            'matrix_shape': self.ising_model[0].to_matrix(massive=True).shape,
            # 'shots': self.sampler.options,
            'circuit': encoded,
            'histogram': encoded_histogram,
            'qubo': self.qubo.export_as_lp_string(),
        }

    def get_mean_and_std(self, qaoa_result: MinimumEigenOptimizationResult):
        #https://qiskit.org/ecosystem/optimization/tutorials/03_minimum_eigen_optimizer.html
        fvals = [s.fval for s in qaoa_result.samples]
        probabilities = [(s.fval, s.probability) for s in qaoa_result.samples]
        mean = np.mean(fvals)
        std = np.std(fvals)
        filtered_samples = self.get_filtered_samples(
            qaoa_result.samples, threshold=0., allowed_status=(OptimizationResultStatus.SUCCESS,)
        )
        samples_for_plot = {
            " ".join(f"{qaoa_result.variables[i].name}={int(v)}" for i, v in enumerate(s.x)): s.probability
            for s in filtered_samples
        }
        total_prob = sum(samples_for_plot.values())
        infeasible_prob = 1 - total_prob
        #samples_for_plot["infeasible"] = infeasible_prob
        filename = "./histogram.png"
        plot = plot_histogram(samples_for_plot, filename=filename, figsize=(28, 26), title="Samples")
        with open(filename, 'rb') as file:
            enconded_string = base64.b64encode(file.read()).decode('utf-8')
        return mean, std, enconded_string

    def get_filtered_samples(self,
                             samples: List[SolutionSample],
                             threshold: float = 0,
                             allowed_status: Tuple[OptimizationResultStatus] = (
                                 OptimizationResultStatus.SUCCESS,),
                             ):
        res = []
        for s in samples:
            if s.status in allowed_status and s.probability > threshold:
                res.append(s)

        return res
