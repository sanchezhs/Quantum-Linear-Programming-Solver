from lark import Lark
from django.core.exceptions import ValidationError
from rest_framework import serializers
from itertools import chain

constraints_grammar = """
    ?start: comparison
    
    ?comparison: expr ("<" | ">" | ">=" | "<=" | "=") expr

    ?expr: expr ("+" | "-") term
        | expr ("+" | "-") linexp
        | term
        | linexp

    ?linexp: "(" linexp ")"
        | "-"? NUMBER VAR
        | "-"? VAR
        
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
    duplicates = set(chain.from_iterable(
        values for values in rev_multidict.values() if len(values) > 1))
    if duplicates:
        raise serializers.ValidationError(
            ('Constraint %(name)s duplicated: %(value)s'),
            code='duplicated',
            params=duplicates,
        )


def validate_objetive(objetive):
    try:
        parser = Lark(objetive_grammar, parser='lalr')
        tree = parser.parse
        tree(objetive)
        # print(tree(objetive), 'ok')
    except:
        # print('error objetive')
        raise serializers.ValidationError(
            f'Invalid value (parse error): {objetive}'
        )


def validate_constraints(constraints):
    try:
        for constraint in constraints:
            parser = Lark(constraints_grammar, parser='lalr')
            tree = parser.parse
            tree(constraint)
    except:
        print('error constraints')
        raise serializers.ValidationError(
            f'Invalid value (parse error): {constraint}'
        )
