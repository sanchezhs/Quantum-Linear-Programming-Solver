import re

def insert_multiplication_operator(s):
    # Replace any instance of a number adjacent to a letter with a '*' in between
    s = re.sub(r'(\d)([a-zA-Z])', r'\1*\2', s)
    # Replace any instance of a letter adjacent to a number with a '*' in between
    s = re.sub(r'([a-zA-Z])(\d)', r'\1*\2', s)
    return s

print(insert_multiplication_operator('2x+4y-z+1'))