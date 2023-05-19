import numpy as np
from qiskit_ibm_runtime import QiskitRuntimeService, Sampler
from qiskit import Aer, QuantumCircuit
from qiskit_optimization import QuadraticProgram
from qiskit_optimization.converters import QuadraticProgramToQubo
from scipy.optimize import minimize
from .build_circuit import BuildCircuit

class OptimizeProblem():
    """ Class to optimize a problem using qiskit_optimization
        It receives all the parameters from the frontend
        and the QuadraticProgram from qiskit_optimization. 
    """
    def __init__(self, conv: QuadraticProgramToQubo, qubo: QuadraticProgram, qp: QuadraticProgram, p: int, type: str, max_value: int, shots: str, seed: int, token) -> None:
        """ Constructor

        Args:
            conv (QuadraticProgramToQubo): Converter from QuadraticProgram to Qubo
            qubo (QuadraticProgram): QUBO from qiskit_optimization
            qp (QuadraticProgram): Original QuadraticProgram
            p (int): Circuit repetitions
            type (str): Sense of the problem
            max_value (int): Max value of the problem
            shots (str): Number of shots for the optimization
            seed (int): Seed for the random number generator
        """
        self.conv = conv
        self.qubo = qubo
        self.original_qp = qp
        self.p = p
        self.type = type
        self.max_value = max_value
        self.shots = int(shots)
        self.seed = seed  
        self.token = token
        self.rng = np.random.RandomState(seed=self.seed)
        self.ising = qubo.to_ising()
        self.circuit = None
        self.nqubits = len(qubo.variables)
        self.backend = Aer.get_backend('qasm_simulator')

    def execute_circuit(self, theta):
        """ Execute circuit on the backend

        Args:
            theta (_type_): Gates parameters

        Returns:
            _type_: Counts and samples from the circuit
        """
        self.circuit = BuildCircuit(
            self.nqubits, self.ising, theta, self.p).build()
        histogram = self.backend.run(
            self.circuit).result().get_counts()
        return histogram

    def evaluate(self, sample: np.ndarray) -> float:
        """ Evaluate a sample using the QUBO

        Args:
            sample (np.ndarray): Array of 0s and 1s

        Returns:
            float: Value of the sample
        """
        sample = str(sample)
        float_array = np.array([float(bit) for bit in sample])
        return self.qubo.objective.evaluate(float_array)

    def cost(self):
        """ Cost function for the optimization
        """
        def solution_energy(theta) -> float:
            histogram = self.execute_circuit(theta)
            reversed = self.invert_counts(histogram)
            energy = 0
            total_counts = 0
            for sample, count in reversed.items():
                if self.is_feasible(sample):
                    total_counts += count
                    energy += self.evaluate(sample) * count
            return energy / total_counts if total_counts > 0 else 0
        return solution_energy

    def solve(self):
        """ Solve the optimization problem

        Returns:
            list(tuple), ndarray, QuantumCircuit:  List of tuples with the bests solutions, best theta and circuit
        """
        best_theta = self.optimize()
        all_solutions = self.execute_circuit(best_theta.x)

        all_solutions = self.invert_counts(all_solutions)
        best = sorted(all_solutions.items(), key=lambda x: x[1], reverse=True)
        best_interpreted = self.filter_solutions(best)
        
        return best_interpreted, best_theta, self.circuit

    def optimize(self):
        """ Optimize the problem using COBYLA

        Returns:
            ndarray: Result of the optimization (best parameters)
        """
        init = [self.rng.random() + (self.max_value / (2 * np.pi)) for _ in range(0, 2 * self.p)]
        cost = self.cost()
        return minimize(cost, init, method='COBYLA', options={'maxiter': self.shots, 'disp': True, 'rhobeg': 0.25})

    def is_feasible(self, sample: np.ndarray) -> bool:
        """ Check if a sample is feasible (satisfies the constraints)

        Args:
            sample (np.ndarray): Sample to check

        Returns:
            bool: True if the sample is feasible, False otherwise
        """
        return self.original_qp.is_feasible(self.interpret(sample))

    def interpret(self, sample: np.ndarray) -> np.ndarray:
        """ Interpret a sample from the circuit (convert from binary to integer)
        Args:
            sample (np.ndarray): Binary sample

        Returns:
            np.ndarray: Integer sample
        """
        x = np.array([int(bit) for bit in str(sample)])
        return self.conv.interpret(x)

    def filter_solutions(self, all_solutions):
        """ Filter the solutions to get only the feasible ones
        Args:
            all_solutions (_type_): All solutions from the circuit (feaseble and infeasible)
        Returns:
            dict: Dictionary with the feasible solutions and their counts
        """
        feasibles = {}
        for sol in all_solutions:
            x = np.array([int(bit) for bit in str(sol[0])])
            x_int = self.conv.interpret(x)
            if self.original_qp.is_feasible(x_int):
                x_int_tuple = tuple(x_int)
                if x_int_tuple not in feasibles:
                    feasibles[x_int_tuple] = 0
                feasibles[x_int_tuple] += int(sol[1])
        feasibles = sorted(feasibles.items(), key=lambda x: self.original_qp.objective.evaluate(np.array(x[0])), reverse=True)
        
        return feasibles

    def invert_counts(self, counts) :
        """ Helper function to invert the results given by qiskit
        Args:
            counts (dict): Values and counts

        Returns:
            counts(dict): Inverted values and counts
        """
        return {k[::-1]: v for k, v in counts.items()}

    def execute_on_real_device(self, theta):
        """ Execute the circuit on a real device

        Args:
            theta (ndarry): Optimization parameters

        Returns:
            dict: Count and samples from the circuit
        """
        service = QiskitRuntimeService(
            channel="ibm_quantum", token=self.token)
        backend = service.least_busy(simulator=False)
        circuit = BuildCircuit(
            self.nqubits, self.ising, theta, self.p).build()
        sampler = Sampler(session=backend)
        job = sampler.run(circuit)
        res = job.result()
        return res
