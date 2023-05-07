from qiskit import BasicAer
from sympy import sympify
from qiskit_optimization import QuadraticProgram
from qiskit_optimization.converters import QuadraticProgramToQubo
from qiskit_optimization.algorithms import (
    MinimumEigenOptimizer,
)
from qiskit_optimization import QuadraticProgram
from qiskit.algorithms.minimum_eigensolvers import QAOA, NumPyMinimumEigensolver
from qiskit_optimization.algorithms.minimum_eigen_optimizer import MinimumEigenOptimizationResult
from qiskit.algorithms.optimizers import COBYLA
from qiskit.primitives import Sampler
from typing import List, Tuple
from qiskit.utils import algorithm_globals
from qiskit.algorithms.minimum_eigensolvers import QAOA, NumPyMinimumEigensolver
from qiskit.algorithms.optimizers import COBYLA
from qiskit.primitives import Sampler
from qiskit_optimization.algorithms import (
    MinimumEigenOptimizer,
    RecursiveMinimumEigenOptimizer,
    SolutionSample,
    OptimizationResultStatus,
)
from qiskit.opflow import OperatorBase, PauliSumOp
from qiskit_optimization import QuadraticProgram
from qiskit_optimization.converters import QuadraticProgramToQubo, InequalityToEquality, IntegerToBinary, LinearEqualityToPenalty, MaximizeToMinimize
from qiskit.visualization import plot_histogram
from typing import List, Tuple
import numpy as np
import re
import json


class Problem():

    def __init__(self, objetive: str, constraints: list[str], type: str, upperbound: int) -> None:
        self.objetive = objetive
        self.constraints = constraints
        self.type = type
        self.upperbound = int(upperbound)
        self.sense = {'=': 'EQ', '>=': 'GE', '<=': 'LE', '>': 'GE', '<': 'LE'}

    def solve(self):
        qp = ToQiskitConverter(self).to_qiskit()
        ising_model = self.get_ising(qp)
        optimized, sampler = self.qaoa_optimize(qp)
        result = Result(optimized, ising_model, sampler).get_results()
        return result, optimized.prettyprint()

    def get_ising(self, qp) -> tuple:
        """ Get ising model and circuit from QuadraticProgram
        Args:
            qp (QuadraticProgram): QuadraticProgram
        Returns:
            tuple: ising model and circuit
        """
        conv = QuadraticProgramToQubo()
        qubo = conv.convert(qp)
        print(qubo.export_as_lp_string())

        # Convert from Qubo to Ising
        ising_model = qubo.to_ising()

        return ising_model

    def qaoa_optimize(self, qp) -> MinimumEigenOptimizationResult:
        """ Optimize the Ising model using QAOA
        Args:
            qp (QuadraticProgram): QuadraticProgram
        Returns:
            MinimumEigenOptimizationResult: solution
        """
        algorithm_globals.random_seed = 10598
        backend = BasicAer.get_backend('qasm_simulator')
        sampler = Sampler(options={'shots': 10})
        
        
        qp = QuadraticProgram()
        qp.binary_var('x0')
        qp.binary_var('x1')
        qp.binary_var('s0')
        qp.binary_var('s1')
        qp.maximize(linear={'x0': 16, 'x1': 26, 's0': 15, 's1': 24}, quadratic={('x0', 'x1'): -12, ('x1', 's1'): -24, ('x0', 's1'): -24, ('x0', 's0'): -6, ('s1', 's0'): -12})
        qaoa_mes = QAOA(sampler=sampler, optimizer=COBYLA(), reps=2)
        # exact_mes = NumPyMinimumEigensolver()
        print(qp.prettyprint())
        qaoa = MinimumEigenOptimizer(qaoa_mes)
        # exact = MinimumEigenOptimizer(exact_mes)

        # exact_result = exact.solve(qp)
        qaoa_result = qaoa.solve(qp)
        print(qaoa_result.prettyprint())

        return qaoa_result, sampler


class Result:
    def __init__(self,
                 qaoa_result: MinimumEigenOptimizationResult,
                 ising_model: Tuple[OperatorBase, float],
                 sampler: Sampler) -> None:
        self.qaoa_result = qaoa_result
        self.ising_model = ising_model
        self.sampler = sampler
        # self.get_mean_and_std(qaoa_result)

    def get_results(self):
        print('DETAILS: ', self.qaoa_result.prettyprint())
        print('ISING: ', self.ising_model[0].settings)
        print('NQUBITS: ', self.sampler.circuits[0].num_qubits)
        print('OPTIONS: ', self.sampler.options.get('shots'))
        print('SAMPLES: ', self.qaoa_result.samples)
        print('MASSIVE MATRIX: ', self.ising_model[0].to_matrix(), type(self.ising_model[0].to_matrix()))
        #print('PARAMETERS: ', self.sampler.parameters)
        print('CIRTUIT: ', self.sampler.circuits[0].draw('mpl'))
        print(self.sampler.circuits[0].draw('latex'))
        return {
            'details': self.qaoa_result.prettyprint(),
            'ising': self.ising_model[0],
            'num_qubits': self.sampler.circuits[0].num_qubits,
            'matrix': self.ising_model[0].to_matrix(massive=True),
            'matrix_shape': self.ising_model[0].to_matrix(massive=True).shape,
            'shots': self.sampler.options,
            'cirtuit': self.sampler.circuits[0].draw('mpl'),
        }

    def get_mean_and_std(self, qaoa_result: MinimumEigenOptimizationResult):
        fvals = [s.fval for s in qaoa_result.samples]
        probabilities = [s.probability for s in qaoa_result.samples]
        mean = np.mean(fvals)
        std = np.std(fvals)
        print("Mean:", mean)
        print("Std:", std)

        filtered_samples = self.get_filtered_samples(
            qaoa_result.samples, threshold=0.005, allowed_status=(OptimizationResultStatus.SUCCESS,)
        )
        samples_for_plot = {
            " ".join(f"{qaoa_result.variables[i].name}={int(v)}" for i, v in enumerate(s.x)): s.probability
            for s in filtered_samples
        }
        # plot_histogram(samples_for_plot)
        return mean, std

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


class ToQiskitConverter():
    def __init__(self, problem: Problem):
        self.problem = problem
        self.objetive = problem.objetive
        self.constraints = problem.constraints
        self.type = problem.type
        self.sense = problem.sense
        self.upperbound = problem.upperbound

    def to_qiskit(self) -> QuadraticProgram:
        # Simplify objetive and constraints
        objetive, constraints = self.simplify()
        processed = self.process_constraints(constraints)

        # Extract coefficients from objetive and constraints
        processed_constraints = self.extract_coeffs(processed)
        processed_objetive = self.extract_objetive_coeffs(objetive)

        return self.__to_qiskit(processed_objetive, processed_constraints)

    def __to_qiskit(self, processed_objetive: dict, processed_constraints: list[dict]) -> QuadraticProgram:
        """ Build ising using qiskit_optimization QuadraticProgram
            using the processed objetive and constraints
        Args:
            processed_objetive (dict): dict containing the coefficients and constant of the objetive
            processed_constraints (dict): dict containing the coefficients, constant, name and sense of the constraints
        """
        # Build QuadraticProgram
        qp = QuadraticProgram()

        # Get variables (integer variables)
        variables = list(processed_objetive[0].keys())
        for variable in variables:
            qp.integer_var(
                lowerbound=0, upperbound=self.upperbound, name=str(variable))

        # Add objetive
        if self.type == 'minimize':
            qp.minimize(
                linear=processed_objetive[0], constant=int(processed_objetive[1]), quadratic={('x', 'y'): 1})
        else:
            qp.maximize(
                linear=processed_objetive[0], constant=int(processed_objetive[1]), quadratic={})

        # Add constraints
        for processed_constraint in processed_constraints:
            qp.linear_constraint(linear=processed_constraint['linear'], sense=processed_constraint['sense'],
                                 rhs=int(processed_constraint['rhs']), name=processed_constraint['name']
                                 )

        return qp

    def simplify(self):
        """ Insert multiplication sign between variables and numbers
           for sympify to work properly
        Returns:
            str: objetive and constraints with multiplication sign
        """
        objetive = sympify(self.__insert_mult(self.objetive))
        constraints = [self.__insert_mult(constraint)
                       for constraint in self.constraints]
        return objetive, constraints

    def process_constraints(self, constraints: list[str]) -> list[str]:
        """ Process constraints to be used by qiskit_optimization
            equalize all constraints to 0 and save the inequality type
        Args:
            constraints (str): constraints

        Returns:
            str: constriants equalized to 0
        """
        processed = []
        for constraint in constraints:
            operator = self.__check_inequality_type(constraint)
            lhs, rhs = constraint.split(operator)
            expr = sympify(lhs) - sympify(rhs)
            processed.append((expr, operator))
        return processed

    def extract_coeffs(self, constraints: list[str]) -> list[dict]:
        """ Extract the coefficients and constant of the constraints
            and add the inequality type and name
        Args:
            constraints (list): list of constraints
        Returns:
            list(dict): list of dicts containing the coefficients, constant, name and sense of the constraints
            for later use by qiskit_optimization
        """
        parsed = []
        for i, c in enumerate(constraints):
            operator = c[1]
            parsed_constraint = self.parse_constraint(c[0])
            parsed_constraint['sense'] = self.sense[operator]
            parsed_constraint['name'] = f'constraint_{i}'
            parsed.append(parsed_constraint)
        return parsed

    def parse_constraint(self, constraint_str: str) -> dict:
        """ Parse constraint individually to be used by qiskit_optimization
        Args:
            constraint_str (str): constraint
        Returns:
            dict: right hand side and linear coefficients
        """
        constraint = sympify(constraint_str)
        constant = constraint.as_coeff_add()[0]
        terms = constraint.as_coefficients_dict()
        linear = {str(var): float(terms[var])
                  for var in terms if var.is_Symbol}
        return {'rhs': -float(constant), 'linear': linear}

    def extract_objetive_coeffs(self, objetive: str) -> dict:
        """ Extract the coefficients and constant of the objetive
        Args:
            objetive (sympy): objetive function
        Returns:
            dict: dict containing coefficients and constant of the objetive
        """
        linear = {}
        constant = objetive.as_coeff_add()[0]
        terms = objetive.as_coefficients_dict()
        linear = {str(var): float(terms[var])
                  for var in terms if var.is_Symbol}
        return linear, constant

    def __insert_mult(self, string: str) -> str:
        """ Insert multiplication sign between number and variable
            so sympy can parse it
        Args:
            string (expression): objective function or constraint
        Returns:
            string: expression with multiplication sign added
        """
        return re.sub(r'(\d+)([a-zA-Z])', r'\1*\2', string)

    def __check_inequality_type(self, constraint: str) -> str:
        """ Return the inequality type of the constraint
        Args:
            constraint (str): Constraint

        Raises:
            ValueError: In case of invalid format
        Returns:
            str: operator of the inequality (<=, >=, <, >, =)
        """
        inequality_type = {
            r'<=': '<=',
            r'>=': '>=',
            r'<': '<',
            r'>': '>',
            r'=': '=',
        }
        for pattern, operator in inequality_type.items():
            if re.search(pattern, constraint):
                return operator
        raise ValueError('Invalid constraint')


p = Problem('x',
            [],
            'minimization',
            10)
p.solve()

