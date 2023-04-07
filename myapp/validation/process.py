import re


def process_form(query_dict):
    objetive = {}
    constraints = {}
    for key, value in query_dict.items():
        if key == 'function':
            objetive['function'] = value
        elif key == 'optimizationType':
            if int(value) == 1:
                objetive['max'] = True 
            elif int(value) == 0:
                objetive['min'] = True
                
    constraintList = query_dict.getlist('constraint')
    constraintNumber = 0
    for constraint in constraintList:
        #constraints['constraint-'+str(constraintNumber)] = constraint
        constraints['id_form-'+str(constraintNumber)+'-constraint'] = constraint
        constraintNumber += 1

    return objetive, constraints