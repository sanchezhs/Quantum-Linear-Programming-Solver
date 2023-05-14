from qiskit_optimization.converters import QuadraticProgramToQubo, MinimizeToMaximize, MaximizeToMinimize, IntegerToBinary, InequalityToEquality, LinearEqualityToPenalty
from qiskit_optimization import QuadraticProgram
from qiskit_optimization.algorithms.minimum_eigen_optimizer import MinimumEigenOptimizer
from qiskit.primitives import Sampler
from qiskit.algorithms.minimum_eigensolvers import QAOA
from qiskit.algorithms.optimizers import COBYLA


qp = QuadraticProgram()
qp.integer_var(name='x', lowerbound=0, upperbound=10)
qp.integer_var(name='y', lowerbound=0, upperbound=10)
qp.maximize(linear={'x': 1, 'y': 1})
qp.linear_constraint(linear={'x': 1}, sense='EQ', rhs=5, name='c1') # x <= 1
qp.linear_constraint(linear={'x': 1, 'y': 1}, sense='LE', rhs=1, name='c2') # x <= 1
qp.linear_constraint(linear={'y': 1}, sense='GE', rhs=3, name='c3') # x <= 1

sampler = Sampler()
qaoa_mes = QAOA(sampler=sampler, optimizer=COBYLA(), reps=1)
qaoa_res = MinimumEigenOptimizer(qaoa_mes).solve(qp)
print(qaoa_res)
#qubo = QuadraticProgramToQubo().convert(qp)

print('----------------------------------------------------------------------------')

#qp = QuadraticProgram()
#qp.integer_var(name='x', lowerbound=0, upperbound=2)
#qp.maximize(linear={'x': 1})
#qp.linear_constraint(linear={'x': 1}, sense='LE', rhs=1, name='c1')
#
#qubo = QuadraticProgramToQubo().convert(qp)
#print(qp.prettyprint())
#print(qubo.prettyprint())
