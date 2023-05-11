from qiskit_optimization import QuadraticProgram
from sympy import sympify
import re


class ToQiskitConverter():
    def __init__(self, problem):
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
        print(processed_objetive[0])
        for var, coef in processed_objetive[0].items():
            if coef < 0:
                qp.integer_var(
                    lowerbound=0, upperbound=self.upperbound, name=str(var))
            else:
                qp.integer_var(
                    lowerbound=0, upperbound=self.upperbound, name=str(var))
        # for variable in variables:
        #    qp.integer_var(
        #        lowerbound=0, upperbound=self.upperbound, name=str(variable))

        # Add objetive
        #qp.minimize(
        #        linear=processed_objetive[0], constant=int(processed_objetive[1])) # test, borrar si no funciona
        if self.type == 'minimize':
            qp.minimize(
                linear=processed_objetive[0], constant=int(processed_objetive[1]))
        else:
            qp.maximize(
                linear=processed_objetive[0], constant=int(processed_objetive[1]))

        # Add constraints
        try:
            for processed_constraint in processed_constraints:
                if processed_constraint['sense'] == 'L':
                    qp.linear_constraint(linear=processed_constraint['linear'], sense=processed_constraint['sense'],
                                         rhs=int(processed_constraint['rhs']-1), name=processed_constraint['name']
                                         )
                elif processed_constraint['sense'] == 'G':
                    qp.linear_constraint(linear=processed_constraint['linear'], sense=processed_constraint['sense'],
                                         rhs=int(processed_constraint['rhs']+1), name=processed_constraint['name']
                                         )
                else:
                    qp.linear_constraint(linear=processed_constraint['linear'], sense=processed_constraint['sense'],
                                         rhs=int(processed_constraint['rhs']), name=processed_constraint['name']
                                         )
        except Exception as e:
            raise Exception(
                'Error while processing constraints. Check if the constraint name already exists or the sense is valid') from e

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
            parsed_constraint['name'] = f'c_{i}'
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
