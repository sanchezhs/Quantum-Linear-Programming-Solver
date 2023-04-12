import re
from sympy import sympify, reduce_inequalities

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
        print('sustituida ', self.subsitute(objetive))
        if len(constraints) > 0:
            reduced = reduce_inequalities(constraints[0], [])

    # x_i = (1 - z_i)/2
    def subsitute(self, objetive):
        free_vars = objetive.free_symbols
        substituted = objetive.subs([(var, "(1-"+str(var)+"_"+str(i)+")/2" ) for i, var in enumerate(free_vars)])

        return substituted

    def insert_mult_operator(self, string):
        return re.sub(r'(\d)([a-zA-Z])', r'\1*\2', string)
