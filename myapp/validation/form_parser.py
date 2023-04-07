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
    VAR: "a" .. "z"

    %import common.WS_INLINE
    %import common.DIGIT
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
    VAR: "a" .. "z"

    %import common.WS_INLINE
    %import common.DIGIT
    %ignore WS_INLINE
"""
        

def validate_objetive(objetive):
    print(objetive)
    try:
        parser = Lark(objetive_grammar, parser='lalr') 
        tree = parser.parse
        print(tree(objetive), 'ok')
    except:
        print('no')
        raise ValidationError(
                ('Invalid value (parse error): %(value)s'),
                code='invalid',
                params={'value': objetive},
        )
        

def validate_constraints(name, constraint):
    print(constraint)
    try:
        parser = Lark(constraints_grammar, parser='lalr') 
        tree = parser.parse
        print(tree(constraint), 'ok')
    except:
        print('no')
        raise ValidationError(
                ('Invalid value (parse error): %(value)s'),
                code='invalid',
                params={'value': constraint,
                        'name': name},
        )

            
