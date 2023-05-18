from qiskit_optimization.converters import QuadraticProgramToQubo, MinimizeToMaximize, MaximizeToMinimize, IntegerToBinary, InequalityToEquality, LinearEqualityToPenalty
from qiskit_optimization import QuadraticProgram
from qiskit_optimization.algorithms.minimum_eigen_optimizer import MinimumEigenOptimizer
from qiskit.primitives import Sampler
from qiskit.algorithms.minimum_eigensolvers import QAOA
from qiskit.algorithms.optimizers import COBYLA
from cplex import Cplex


qp = QuadraticProgram()
qp.integer_var(name='x', lowerbound=0, upperbound=10)
qp.integer_var(name='y', lowerbound=0, upperbound=10)
qp.integer_var(name='z', lowerbound=0, upperbound=10)
qp.integer_var(name='t', lowerbound=0, upperbound=10)
qp.minimize(linear={'x': 1, 'y': 1, 'z': -1, 't': 1})
qp.linear_constraint(linear={'x': 1}, sense='LE', rhs=1, name='c1') 
qp.linear_constraint(linear={'x': 2, 'y': 1}, sense='LE', rhs=0, name='c2') 
qp.linear_constraint(linear={'z': 1}, sense='LE', rhs=0, name='c3') 
qp.linear_constraint(linear={'t': 1}, sense='EQ', rhs=1, name='c4') 

sampler = Sampler()
qaoa_mes = QAOA(sampler=sampler, optimizer=COBYLA(), reps=1)
qaoa_res = MinimumEigenOptimizer(qaoa_mes).solve(qp)
print(qaoa_res)

feasible = [sample for sample in qaoa_res.samples if qp.is_feasible(sample)]
print(feasible)

#qubo = QuadraticProgramToQubo().convert(qp)

print('----------------------------------------------------------------------------')

