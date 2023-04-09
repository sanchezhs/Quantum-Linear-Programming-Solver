from lark import Lark
from django.core.exceptions import ValidationError


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
        

def validate_objetive(objetive):
    print(objetive)
    try:
        parser = Lark(objetive_grammar, parser='lalr') 
        tree = parser.parse
        print(tree(objetive), 'ok')
    except:
        print('no objetive')
        raise ValidationError(
                ('Invalid value (parse error): %(value)s'),
                code='invalid',
                params={'value': objetive,
                        'objetive': True},
        )
        

def validate_constraints(name, constraint):
    print(constraint)
    try:
        parser = Lark(constraints_grammar, parser='lalr') 
        tree = parser.parse
        print(tree(constraint), 'ok')
    except:
        print('no constraints')
        raise ValidationError(
                ('Invalid value (parse error): %(value)s'),
                code='invalid',
                params={'value': constraint,
                        'name': name},
        )

            
