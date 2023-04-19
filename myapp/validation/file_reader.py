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

from rest_framework import serializers
import re


def extract_data(s):
    pattern = re.compile(r"""(?P<comments>(\/\/\s*.+\s*\r?\n)+)  # Comments starts with // and lines are separated by \r?\n, unix or windows
                              (max|min)\s*:\s*                   # min or max
                              (?P<objetive>.+)\r?\n              # Objective function
                              subject\s+to:\s*\r?\n              # Subject to
                              (?P<constraints>(?:.+\s*\r?\n)+.+) # Constraints, last one without \r?\n
                             """, flags=re.VERBOSE | re.IGNORECASE)
    try:
        match = re.match(pattern, s)
        if not match:
            raise ValueError(f"Invalid input format. The input string '{s}' must match the expected format.")

        comments = match.group('comments')
        
        
        objetive = match.group('objetive')
        constraints = re.findall(r'.+', match.group('constraints'))
        print('comments ', comments)
        print('objetive ', objetive)
        print('constraints ', constraints)

        return objetive, constraints
    except (AttributeError, ValueError) as e:
        raise serializers.ValidationError({'Invalid value': str(e)})