from rest_framework import serializers
import re


def file_extract_data(s: str) -> dict:
    """
    Extract data from a string with the following format:
    // comments
    p = 3
    [min | max]: function
    subject to:
    c1
    c2
    ...
    cn
    """
    pattern = re.compile(r""" (?P<comments>(\/\/\s*.+\s*\r?\n)+)?          # Comments starts with // and lines are separated by \r?\n, unix or windows
                              (?P<seed>seed\s*=\s*[0-9]{1,4})\r?\n         # Seed of the optimization
                              (?P<depth>p\s*=\s*[1-9]+)\r?\n               # Depth of the circuit
                              (?P<lowerBound>lb\s*=\s*[0-9]+)\r?\n         # LowerBound of variables
                              (?P<upperBound>ub\s*=\s*[1-9][0-9]*)\r?\n    # UpperBound of variables
                              (?P<type>(maximize|minimize))\s*:\s*         # minimize or maximize
                              (?P<objetive>.+)\r?\n                        # Objective function
                              subject\s+to:\s*\r?\n                        # Subject to
                              #(?P<constraints>(?:.+\s*\r?\n)+.+)          # Constraints, last one without \r?\n
                              (?P<constraints>(?:.+\s*\r?\n)+)             # Constraints, last one without \r?\n
                              (?P<AnythingElse>).*                         # Anything else
                             """, flags=re.VERBOSE | re.IGNORECASE)
    try:
        match = re.match(pattern, s)
        print('match ', match)
        if not match:
            raise serializers.ValidationError(
                {'errors': [
                    f"Invalid input format. The input string '{s}' must match the expected format."]}
            )

        comments = match.group('comments')
        p = match.group('depth').strip().split('=')[1]
        seed  = match.group('seed').strip().split('=')[1]
        lowerBound = match.group('lowerBound').strip().split('=')[1]
        upperBound = match.group('upperBound').strip().split('=')[1]
        type = match.group('type')
        objetive = match.group('objetive')
        constraints = re.findall(r'.+', match.group('constraints'))
        print('p ', p)
        print('seed ', seed)
        print('lowerBound ', lowerBound)
        print('upperBound ', upperBound)
        print('comments ', comments)
        print('objetive ', objetive)
        print('constraints ', constraints)
        print('type ', type)
        print('todo ok en txt')
        return {
            'seed': seed,
            'p': p,
            'lowerBound': lowerBound,
            'upperBound': upperBound,
            'objetive': objetive,
            'constraints': constraints,
            'type': type
        }
    except (AttributeError, ValueError) as e:
        raise serializers.ValidationError({'Invalid value': str(e)})

# s = "// comentariosA x mayor que 0\n// comentariosN\n// comentariosC\nmin: hola que tal\nsubject to:\nx < 1\ny < 2\n2*(1+2+3+4) - x < 21\n"
# extract_data(s)
