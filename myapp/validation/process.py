import re


def process_form(query_dict):
    data = {}
    data['maximize'] = False
    regex = r'^form-\d+-restriction$'
    for key, value in query_dict.items():
        if key == 'function':
            data['function'] = value
        elif key == 'maximize':
            data['maximize'] = True
        elif re.match(regex, key):
            if value != '':
                data[key] = value
    return data