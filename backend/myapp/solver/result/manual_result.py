import base64
import matplotlib
from qiskit_optimization.problems.quadratic_objective import ObjSense
from qiskit_optimization import QuadraticProgram
import numpy as np

# https://matplotlib.org/stable/users/explain/backends.html
# Agg is a non-interactive backend that can only write to files.
matplotlib.use('agg') 

class ManualResult:
    def __init__(self, best_sol, best_params, circuit, qubo: QuadraticProgram, qp: QuadraticProgram) -> None:
        self.best_sol = best_sol
        self.best_params = best_params
        self.circuit = circuit
        self.qubo = qubo
        self.original = qp

    def get_results(self):
        objetive_value, vars_values, encoded_histogram = self.get_solution_details(self.best_sol)

        encoded_circuit = self.save_circuit(self.circuit, './circuit.png')
        matplotlib.pyplot.close()
        return {
            'objetive': objetive_value,
            'vars_values': vars_values,
            'num_qubits': self.circuit.num_qubits,
            'parameters': self.best_params.x,
            'circuit': {'light': encoded_circuit, 'dark': ''},
            'histogram': '',
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
            best = sol[0]
        else:
            best = sol[-1]
        values = np.array(best[0])
        objetive_value = self.original.objective.evaluate(values)
        vars_values = {}
        for i, var in enumerate(self.original.variables):
            vars_values[var.name] = values[i]
            
        return objetive_value, vars_values, ''
