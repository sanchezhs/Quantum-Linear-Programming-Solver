import re, json
from sympy import sympify, reduce_inequalities, simplify

class Sympy():

    def __init__(self, objetive, constraints):
        self.objetive = objetive['function']
        self.type = objetive['optimizationType']
        self.constraints = [constraint['constraint'] for constraint in constraints]
        self.simplify(self.objetive, self.constraints)

    def simplify(self, objetive, constraints):
        objetive = self.insert_mult_operator(objetive)
        constraints = [self.insert_mult_operator(constraint) for constraint in constraints]
        objetive = sympify(objetive)
        constraints = [sympify(constraint) for constraint in constraints]
        print('sympified ', objetive, constraints)
        # print('sustituida ', self.subsitute(objetive))
        return objetive, constraints

    # x_i = (1 - z_i)/2
    def subsitute(self, objetive):
        free_vars = objetive.free_symbols
        substituted = objetive.subs([(var, "(1-"+str(var)+"_"+str(i)+")/2" ) for i, var in enumerate(free_vars)])

        return substituted

    def insert_mult_operator(self, string):
        return re.sub(r'(\d)([a-zA-Z])', r'\1*\2', string)

    def toJSON(self):
        return json.dumps(str(self.simplify(self.objetive, self.constraints)))
    
    def simplify_constraints(self, constraints):
        """ Divide constraints into two groups separated by 
        '<, <=' and '>, >=' operators
        Put parentheses and "-" sign around second group
        then simplify the expression
        Args:
            constraints (_type_): _description_
        """
        constraints = str(constraints[0])
        parts = re.split(r'(<|>)=?', constraints)
        lhs, rhs = parts[0], parts[2]
        rhs = '-(' + rhs + ')'
        expression = lhs + rhs + parts[1] + ' 0 '
        print('expression ', simplify(expression))
        pass