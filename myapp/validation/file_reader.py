from rest_framework import serializers
import re


def file_extract_data(s: str) -> tuple[str, str, list[str], str]:
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
    pattern = re.compile(r""" (?P<comments>(\/\/\s*.+\s*\r?\n)+)?       # Comments starts with // and lines are separated by \r?\n, unix or windows
                              (?P<depth>p\s*=\s*[1-9]+)\r?\n                         # Depth of the circuit
                              (?P<type>(maximize|minimize))\s*:\s*              # min or max
                              (?P<objetive>.+)\r?\n                   # Objective function
                              subject\s+to:\s*\r?\n                   # Subject to
                              #(?P<constraints>(?:.+\s*\r?\n)+.+)      # Constraints, last one without \r?\n
                              (?P<constraints>(?:.+\s*\r?\n)+)      # Constraints, last one without \r?\n
                              (?P<AnythingElse>).*                                     # Anything else
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
        type = match.group('type')
        objetive = match.group('objetive')
        constraints = re.findall(r'.+', match.group('constraints'))
        print('p ', p)
        print('comments ', comments)
        print('objetive ', objetive)
        print('constraints ', constraints)
        print('type ', type)
        print('todo ok en txt')
        return p, objetive, constraints, type
    except (AttributeError, ValueError) as e:
        raise serializers.ValidationError({'Invalid value': str(e)})

# s = "// comentariosA x mayor que 0\n// comentariosN\n// comentariosC\nmin: hola que tal\nsubject to:\nx < 1\ny < 2\n2*(1+2+3+4) - x < 21\n"
# extract_data(s)
