"""
// comentarios
[min | max]: funcion
subject to: 
c1
c2
c3
...
cn
"""
from mysite.exceptions import FileSyntaxError
import re

def parse_string(parts):
    objective_pattern = r'\bmin\b|\bmax\b\s*'
    objective_re = re.compile(objective_pattern, flags=re.I)
    constraints_pattern = r'\bsubject\b \bto\b:'
    constraints_re = re.compile(constraints_pattern, flags=re.I) 
    print('parsing...', parts[0].split(': '))
    return re.search(objective_re, parts[0].split(': ')[0]) and re.search(constraints_re, parts[1])

def read_string(s):
    parts = s.split('\r\n')
    print(parts)
    if not parse_string(parts):
       raise FileSyntaxError()
    objective = parts[0].split(': ')
    constraints = parts[2:]
    
    return objective, constraints



""" def read_file(file):
    first_line_pattern = r'\bmin\b | \bmax\b:.+'
    first_line = re.compile(first_line_pattern, flags=re.I | re.X)
    second_line_pattern = r'subject to:\s*'
    second_line = re.compile(second_line_pattern, flags=re.I)
    function = ''
    constraints = []
    with open(file, 'rb') as f:
        for i, line in enumerate(f):
            if i == 0 and re.match(first_line, line):
                function = line.split(':')
            elif i == 1 and re.match(second_line, line):
                print('error')
            else:
                constraints.append(line)
    return function, constraints 
    """

