from lark import Lark
from django.core.exceptions import ValidationError
from itertools import chain

constraints_grammar = """
    ?start: comparison
    
    ?comparison: expr ("<" | ">" | ">=" | "<=" | "=") expr

    ?expr: expr ("+" | "-") term
        | expr ("+" | "-") linexp
        | term
        | linexp

    ?linexp: "(" linexp ")"
        | NUMBER VAR
        | VAR
        
    ?term: term ("*" | "/") factor
        | factor

    ?factor: "(" expr ")" 
        | "-" NUMBER 
        | NUMBER
    
    NUMBER: DIGIT+ 
        |   FLOAT
    VAR: "a" .. "z"

    %import common.WS_INLINE
    %import common.DIGIT
    %import common.FLOAT
    %ignore WS_INLINE
"""

objetive_grammar = """
    ?start: expr
    
    ?expr: expr ("+" | "-") term
        | expr ("+" | "-") linexp
        | term
        | linexp

    ?linexp: "(" linexp ")"
        | NUMBER VAR
        | VAR
        
    ?term: term ("*" | "/") factor
        | factor

    ?factor: "(" expr ")" 
        | "-" NUMBER 
        | NUMBER
    
    NUMBER: DIGIT+     
        |   FLOAT
    VAR:  LETTER
        | LETTER "_" (DIGIT ~ 1..5)
        

    %import common.WS_INLINE
    %import common.LCASE_LETTER -> LETTER
    %import common.DIGIT
    %import common.FLOAT
    %ignore WS_INLINE
"""
def check_duplicated_constraints(constraints):  
    rev_multidict = {}
    for name, constraint in constraints.items():
        rev_multidict.setdefault(constraint, set()).add(name)
    duplicates = set(chain.from_iterable(values for values in rev_multidict.values() if len(values) > 1))
    if duplicates:
            raise ValidationError(
                ('Constraint %(name)s duplicated: %(value)s'),
                code='duplicated',
                params=duplicates,
            )        
    


def validate_forms(objetive, constraints):

    def validate_objetive(objetive):
        objetive = objetive['function']
        print(objetive)
        try:
            parser = Lark(objetive_grammar, parser='lalr') 
            tree = parser.parse
            print(tree(objetive), 'ok')
        except:
            print('error objetive')
            raise ValidationError(
                    ('Invalid value (parse error): %(value)s'),
                    code='objetive',
                    params={'value': objetive,
                            'objetive': True},
            )
        

    def validate_constraints(constraints):
        if constraints:
            for name, constraint in constraints.items():
                print(constraint)
                try:
                    parser = Lark(constraints_grammar, parser='lalr') 
                    tree = parser.parse
                    print(tree(constraint), 'ok')
                except:
                    print('error constraints')
                    raise ValidationError(
                            ('Invalid value (parse error): %(value)s'),
                            code='constraints',
                            params={'value': constraint,
                                    'name': name},
                    )
        
    validate_objetive(objetive)
    validate_constraints(constraints)
    check_duplicated_constraints(constraints)