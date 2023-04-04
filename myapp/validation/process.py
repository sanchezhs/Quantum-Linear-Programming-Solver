import re


def process_form(query_dict):
    data = {}
    constraintNumber = 0
    for key, value in query_dict.items():
        # print(key, value)
        if key == 'function':
            data['function'] = value
        elif key == 'optimizationType':
            if value == 1:
                data['max'] = True 
            else:
                data['min'] = True
    constraintList = query_dict.getlist('constraint')
    for constraint in constraintList:
        data['constraint-'+str(constraintNumber)] = constraint
        constraintNumber += 1

    return data