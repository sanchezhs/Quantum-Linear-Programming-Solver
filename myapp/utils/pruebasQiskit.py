import sympy as sp
from qiskit_optimization.converters import QuadraticProgramToQubo, MinimizeToMaximize, MaximizeToMinimize, IntegerToBinary, InequalityToEquality, LinearEqualityToPenalty
from qiskit_optimization import QuadraticProgram

qp = QuadraticProgram()
qp.integer_var(name='x', lowerbound=0, upperbound=2)
qp.minimize(linear={'x': 1})
qp.linear_constraint(linear={'x': 1}, sense='LE', rhs=1, name='c1')

qubo = QuadraticProgramToQubo().convert(qp)
print(qubo.prettyprint())
print(qp.prettyprint())

print(qubo.objective.linear.to_dict(use_name=True))


""" obj = sp.sympify(str(qubo.objective).split('minimize')[1].replace('@', '_'))
new_qubo = QuadraticProgram()
for var in qubo.variables:
    new_qubo.binary_var(name=var.name)

terms = obj.as_coeff_add()[1]
for term in terms:
    mult = term.as_coeff_mul()
    coeff = mult[0]
    vars = mult[1]
    if len(vars) == 1:
        obj = obj.subs({vars[0]: -vars[0]})
        
        
print(obj.as_coefficients_dict())
new_qubo.minimize(linear=obj.as_coefficients_dict())    

    

print (new_qubo.prettyprint()) """

print('----------------------------------------------------------------------------')

qp = QuadraticProgram()
qp.integer_var(name='x', lowerbound=0, upperbound=2)
qp.maximize(linear={'x': 1})
qp.linear_constraint(linear={'x': 1}, sense='LE', rhs=1, name='c1')

qubo = QuadraticProgramToQubo().convert(qp)
print(qubo.prettyprint())
print(qp.prettyprint())
