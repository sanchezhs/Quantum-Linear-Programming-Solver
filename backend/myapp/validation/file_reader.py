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
                              (?P<type>(maximize|minimize))\s*:\s*         # minimize or maximize
                              (?P<objetive>.+)\s*\r?\n                     # Objective function
                              subject\s+to:\s*\r?\n                        # Subject to
                              (?P<constraints>(?:.+\s*\r?\n?)+)            # Constraints, last one without \r?\n
                              (?P<AnythingElse>).*                         # Anything else
                             """, flags=re.VERBOSE | re.IGNORECASE)
    try:
        match = re.match(pattern, s)
        print('match ', match)

        comments = match.group('comments')
        
        type = match.group('type')
        objetive = match.group('objetive')
        constraints = re.findall(r'.+', match.group('constraints'))
        print('comments ', comments)
        print('objetive ', objetive)
        print('constraints ', constraints)
        print('type ', type)
        print('todo ok en txt')
        return {
            'objetive': objetive.strip(),
            'constraints': constraints,
            'type': type
        }
    except Exception as e:
        raise serializers.ValidationError( {'errors': [
                    f"Invalid input format. The input string: \n{s}\n must match the expected format."]}
            )