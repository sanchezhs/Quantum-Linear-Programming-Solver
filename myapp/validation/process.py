import re


def process_form(query_dict):
    data = {}
    for key, value in query_dict.items():
        print(key, value)
        if key == 'function':
            data['function'] = value
        elif key == 'optimizationType':
            if value == 1:
                data['maximization'] = True 
            else:
                data['minimization'] = True
        elif key == 'constraint':
                data[key] = value
    print(data)
    return data