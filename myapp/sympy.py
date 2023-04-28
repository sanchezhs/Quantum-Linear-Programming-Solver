from sympy import sympify, simplify
import numpy as np
import re


class Sympy():

    def __init__(self, objetive, constraints, type):
        self.objetive = objetive
        self.constraints = constraints
        self.opt_type = type
        self.free_vars = []
        self.NBITS = 1

    def solve(self):
        obj, cons = self.__reformulate(
            self.objetive, self.constraints)
        #obj = self.__remove_mult(str(obj))
        #cons = [self.__remove_mult(str(constraint))
        #        for constraint in cons]
        return obj, cons

    def __reformulate(self, objetive, constraints):
        # Insert multiplication symbols for sympy
        objetive = self.__insert_mult(objetive)
        constraints = [self.__insert_mult(constraint) for constraint in constraints]

        # Negate objective if maximizing
        # Convert objetive and constraints to symbolic expressions
        if self.opt_type == 'maximize':
             objetive = sympify(f"-({objetive})")
        else:
            objetive = sympify(objetive)

        constraints = [sympify(constraint) for constraint in constraints]
        
        # Convert constraints to standard form
        constraints = self.__to_standard_form(
            [str(constraint) for constraint in constraints])
        
        # Convert variables to binary
        subtitutions = self.__binarize(objetive)
        
        # Substitute all variables to binary
        objetive, constraints = self.__substitute(objetive, constraints, subtitutions)
        
        # Compute P
        P = self.__compute_P(objetive)
        
        # Add constraints to objetive
        unconstrained = self.__add_constraints(objetive, constraints, P)
        
        # Expand expression with P
        expanded = str(self.__expand_expr(unconstrained))
        
        # Simplify binary squared terms
        expanded = re.sub(r'\*\*\s*2', '', expanded)

        return expanded, unconstrained
    
    def __expand_expr(self, expr):
        """ Expand the expression using
            sympy.expand(expr, multinomial=True)

        Args:
            expr (str): unconstrained expression
        """
        return sympify(self.__insert_mult(expr)).expand(multinomial=True)
                
    def __add_constraints(self, objetive, constraints, P):
        """ Add constraints to objetive function
            with penalty P, squaring each constraint
        Args:
            objetive (str): objetive
            constraints (str): constraints
            P (int): penalty value
        """
        constraints = list(map(lambda c: re.sub(r'\s*=\s*0\s*', '', c), constraints))
        unconstrained = f"{objetive} + "
        for i, constraint in enumerate(constraints):
            if i == len(constraints) - 1:
                unconstrained += f"{P}*({constraint})**2"
            else:
                unconstrained += f"{P}*({constraint})**2 + "
        
        print ('Unconstrained: ', unconstrained)
        return unconstrained
    
    def __compute_P(self, objetive):
        """ Given the objetive in binary form, 
            computes the penalty value P
            adding the absolute value of the 
            coefficients of the objetive function
        Args:
            objetive (str): objetive

        Returns:
            int: penalty value
        """
        abs_objetive = sympify(re.sub(r'\-', r'+', str(objetive)))
        P = sympify(abs_objetive).subs([(var, 1) for var in abs_objetive.free_symbols])
        print('Computing P...', P, ' in ', objetive)
        return P
    
    def __substitute(self, objective, constraints, substitutions):
        for var, sub in substitutions.items():
            objective = objective.subs(var, sub)
            for i, constraint in enumerate(constraints):
                lhs, rhs = constraint.split('=')
                lhs = sympify(lhs).subs(var, sub)
                constraints[i] = f"{lhs}={rhs}"
           # print(f'Substituting {var} to {sub}, result {objective}')
        #print(f'Constraints: **{constraints}')
        return objective, constraints


    def __binarize(self, objetive):
        """It saves all free variables (constraints and objetive)
           Then, it retuns a map with each variable and its binary representation
        Args:
            objetive (str): objetive

        Returns:
            dict: map with each variable and its binary representation
        """
        variables = list(set(self.free_vars) | set(objetive.free_symbols))
        substitutions = {}
        for var in variables:
            substitutions[var] = " + ".join([f"{2**i}*{var}_{i}" for i in range(self.NBITS)])

        return substitutions
        

    def __to_standard_form(self, constraints):
        """ Transform constraints to standard form
        """
        def check_inequality_type(constraint):
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

        def reduce_inequality(constraint, inequality_type):
            """Reduce inequality to standard form. It simplifies
                the inequality equalizing the right side to 0 and
                return the result and the inequality type.
            given
             the constraint, its index and the inequality type
            Args:
                constraint (str): actual constraint
                index (int): index of constraint
                inequality_type (str): inequality type, can be
                    '<=', '>=', '<', '>', '='
            Raises:
                ValueError: _description_
            Returns:
                standard_form: string representing the simplified constraint
            """
            if inequality_type == '>' or inequality_type == '>=':
                lhs, rhs = constraint.split(inequality_type)
                standard_form = f"-({lhs})-({rhs})"
            elif inequality_type == '<' or inequality_type == '<=':
                lhs, rhs = constraint.split(inequality_type)
                standard_form = f"({lhs})-({rhs})"
            else:
                raise ValueError('Invalid constraint')
            
            return standard_form

        def compute_bound(constraint):
            """Compute bound of constraint
                Substitutes all free variables with 0 
                and returns the result, which is 
                -min(subtituted constraint)
            Args:
                constraint (str): Constraint simplified
            """
            free_vars = constraint.free_symbols
            substituted = int(constraint.subs(
                [(var, "0") for var in free_vars]))
            print(f"Rango de slack variable: 0 <= v <= {-substituted}" )
            return -substituted

        # 0 <= s <= 7
        # s_index_0 + 2*s_index_1 + 4*s_index_2
        def to_binary(index, bound):
            """ Given the maximum value of the slack variable (bound),
                returns the binary representation of the slack variable
                number 'index'. Given v in Z, 0 <= v <= bound, we compute its binary
                representation as follows:
                    v = (2^(n-1) - b)x_n-1 + Sum_{i=0}^{n-2} 2^i*x_i
            Args:
                index (int): Index of constraint
                bound (int): Integer representing the maximum value of the constraint
            """
            try:
                n = int(np.ceil(np.log2(bound)))
            except:
                return '0'
            
            if n == 0:
                return f"s_{index}_0"
            
            b = 2**n - 1 - bound
            last_coef = 2**(n-1) - b
            binary_representation = ''
            for i in range(0, n-2+1):  
                coef = 2**i
                binary_representation += f"{coef}*s_{index}_{i} + " if i != n - \
                    2 else f"{coef}*s_{index}_{i}"

            binary_representation += f" + {last_coef}*s_{index}_{n-1}"
            return binary_representation

        def compute_slack(constraint, index):
            bound = compute_bound(constraint)
            slack = to_binary(index, bound)
            return slack

        for index, constraint in enumerate(constraints):
            inequality_type = check_inequality_type(constraint)
            constraints[index] = reduce_inequality(
                constraint, inequality_type)

        def save_vars(constraints):
            """Save free variables from constraints
            """
            free_vars = []
            for constraint in constraints:
                free_vars.extend(constraint.free_symbols)
            return free_vars

        # Simplify constraints
        constraints = [simplify(constraint) for constraint in constraints]
        
        # Save free variables in simplified constraints
        self.free_vars = save_vars(constraints)
        
        # Add slack variables: Compute bound and convert to binary
        # f(x) <= g(x)
        # 0 <= slack <= -min(f(x) - g(x))
        constraints = [f"{constraint} + {compute_slack(constraint, index)} = 0"
                       for index, constraint in enumerate(constraints)]
        return constraints

    def __remove_mult(self, string):
        """ Remove multiplication sign between number and variable
        Args:
            string (expression): objective function or constraint

        Returns:
            string: expression with multiplication sign removed
        """
        return re.sub(r'(\d+)\*([a-zA-Z])', r'\1\2', string)

    def __insert_mult(self, string):
        """ Insert multiplication sign between number and variable
            so sympy can parse it
        Args:
            string (expression): objective function or constraint
        Returns:
            string: expression with multiplication sign added
        """
        return re.sub(r'(\d+)([a-zA-Z])', r'\1*\2', string)