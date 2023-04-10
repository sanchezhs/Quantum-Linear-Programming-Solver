import re
from sympy import sympify, reduce_inequalities
# free_symbols

class Sympy():

    def __init__(self, objetive, constraints):
        self.objetive = objetive['function']
        self.type = objetive['optimizationType']
        self.constraints = [constraint['constraint'] for constraint in constraints]
        self.simplify(self.objetive, self.constraints)

    def simplify(self, objetive, constraints):
        objetive = self.insert_mult_operator(objetive)
        constraints = [self.insert_mult_operator(constraint) for constraint in constraints]
        print(objetive, constraints)
        objetive = sympify(objetive)
        constraints = [sympify(constraint) for constraint in constraints]
        print('sympified ', objetive, constraints)
        if len(constraints) > 0:
            reduced = reduce_inequalities(constraints[0], [])

    def insert_mult_operator(self, string):
        return re.sub(r'(\d)([a-zA-Z])', r'\1*\2', string)
