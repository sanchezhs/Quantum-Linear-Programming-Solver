import base64
import matplotlib
from qiskit_ibm_runtime import Sampler
from qiskit_optimization.algorithms.minimum_eigen_optimizer import MinimumEigenOptimizationResult
from qiskit.primitives import Sampler
from qiskit_optimization import QuadraticProgram
from qiskit_optimization.converters import QuadraticProgramToQubo
from qiskit.visualization import plot_histogram
import numpy as np

# https://matplotlib.org/stable/users/explain/backends.html
# Agg is a non-interactive backend that can only write to files.
matplotlib.use('agg')


class QiskitResult:
    def __init__(self,
                 measures: MinimumEigenOptimizationResult,
                 qp: QuadraticProgram,
                 sampler: Sampler,
                 theta: np.ndarray) -> None:
        self.measures = measures
        self.qp = qp
        self.sampler = sampler
        self.theta = theta

    def change_order(self, theta: np.ndarray):
        mid = int(len(theta) / 2)
        return theta[mid:] + theta[:mid]

    def get_results(self):
        encoded_light_circuit, encoded_dark_circuit, qasm_circuit = self.save_circuit(
            {'light': './light_circuit.png', 'dark': './dark_circuit.png'})
        qubo = QuadraticProgramToQubo().convert(self.qp)
        # encoded_histogram = self.save_histogram('./histogram.png')
        fval, vars_values, num_qubits = self.get_solution_details()
        matplotlib.pyplot.close()
        return {
            'objetive': fval,
            'vars_values': vars_values,
            'num_qubits': num_qubits,
            'parameters': self.change_order(self.theta),
            'circuit': {
                'light': encoded_light_circuit,
                'dark': encoded_dark_circuit,
            },
            'histogram': '',
            'qp': self.qp.export_as_lp_string(),
            'qubo': qubo.export_as_lp_string(),
            'qasm': qasm_circuit,
        }

    def save_circuit(self, filename: dict) -> tuple[str, str]:
        circuit = self.sampler.circuits[0].decompose().decompose()
        circuit = circuit.bind_parameters(self.theta)

        light_filename = filename['light']
        dark_filename = filename['dark']

        circuit.draw('mpl', filename=light_filename,
                     plot_barriers=False, initial_state=True)
        circuit.draw('mpl', filename=dark_filename, style={
                     'backgroundcolor': '#1c2025', 'textcolor': '#ffffff'}, plot_barriers=False, initial_state=True)

        encoded_light_circuit = self.encode_file(light_filename)
        encoded_dark_circuit = self.encode_file(dark_filename)

        return encoded_light_circuit, encoded_dark_circuit, circuit.qasm()

    def encode_file(self, filename: str) -> str:
        with open(filename, 'rb') as file:
            encoded_circuit = base64.b64encode(file.read()).decode('utf-8')
        return encoded_circuit

    def get_solution_details(self):
        num_qubits = self.sampler.circuits[0].num_qubits
        values = self.measures.x
        fval = int(self.measures.fval)
        variables = self.qp.variables
        vars_values = {}
        for i in range(len(values)):
            vars_values[variables[i].name] = int(values[i])

        return fval, vars_values, num_qubits

    def save_histogram(self, filename):
        pass
