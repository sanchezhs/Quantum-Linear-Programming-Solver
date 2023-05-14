import base64
from qiskit_ibm_runtime import  Sampler
from sympy import sympify
from qiskit_optimization.algorithms.minimum_eigen_optimizer import MinimumEigenOptimizationResult
from qiskit_optimization.problems.quadratic_objective import ObjSense
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
                 best_sol,
                 best_params,
                 circuit,
                 qubo: QuadraticProgram,
                 qp: QuadraticProgram) -> None:
        self.best_sol = best_sol
        self.best_params = best_params
        self.circuit = circuit
        self.qubo = qubo
        self.original = qp

    def get_results(self):
        objetive_value, vars_values, encoded_histogram = self.get_solution_details(self.best_sol)

        encoded_circuit = self.save_circuit(self.circuit, './circuit.png')
        return {
            'objetive': objetive_value,
            'vars_values': vars_values,
            'num_qubits': self.circuit.num_qubits,
            'parameters': self.best_params.x,
            'circuit': encoded_circuit,
            'histogram': encoded_histogram,
            'qubo': self.qubo.export_as_lp_string(),
            'qasm': self.circuit.qasm(),
        }
        
        
    def save_circuit(self, circuit, filename):
        _ = circuit.draw('mpl', filename=filename,
                                plot_barriers=False, initial_state=True)
        with open(filename, 'rb') as file:
            enconded_string = base64.b64encode(file.read()).decode('utf-8')
        return enconded_string


    def get_solution_details(self, sol):
        if self.original.objective.sense == ObjSense.MAXIMIZE:
            sol = {k: v for k, v in sorted(sol.items(), key=lambda item: item[0], reverse=True)}
        else:
            sol = {k: v for k, v in sorted(sol.items(), key=lambda item: item[0])}  
        
        best = list(sol.keys())[0]
            
            
        print('BEST: ', best)
        objetive_value = self.original.objective.evaluate(np.array(best))
        vars_values = {}
        for i, var in enumerate(self.original.variables):
            vars_values[var.name] = best[i]
            
        print('OBJETIVE: ', objetive_value)
        print('VARS: ', vars_values)
        
                
        filename = "./histogram.png"
        _ = plot_histogram(sol, filename=filename, figsize=(28, 26), title="Samples")
        with open(filename, 'rb') as file:
            enconded_string = base64.b64encode(file.read()).decode('utf-8')
        return objetive_value, vars_values, enconded_string
