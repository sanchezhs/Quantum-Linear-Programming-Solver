from sympy import symbols, factor
import re

x,y = symbols('x y')
expr = x*x + 2*x*x 
print(factor(expr))

def insert_multiplication_operator(s):
    # Replace any instance of a number adjacent to a letter with a '*' in between
    s = re.sub(r'(\d)([a-zA-Z])', r'\1*\2', s)
    # Replace any instance of a letter adjacent to a number with a '*' in between
    s = re.sub(r'([a-zA-Z])(\d)', r'\1*\2', s)
    return s

print(insert_multiplication_operator('2x+3y+5z-4*(3t)'))