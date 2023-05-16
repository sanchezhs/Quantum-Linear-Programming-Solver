from lark import Lark, Transformer
from rest_framework import serializers

constraints_grammar = """
    ?start: comparison
    
    ?comparison: expr ("<" | ">" | ">=" | "<=" | "=") expr

    ?expr: expr ("+" | "-") term
        | expr ("+" | "-") linexp
        | term
        | linexp

    ?linexp: "(" linexp ")"
        | "-"? NUMBER VAR           -> linexp_var
        | "-"? VAR
        
    ?term: term ("*" | "/") factor
        | factor

    ?factor: "(" expr ")" 
        | "-" NUMBER 
        | NUMBER
    
    NUMBER: DIGIT+ 
    
    VAR: ("_"|LETTER) ("_"|LETTER|DIGIT)*
        

    %import common.WS_INLINE
    %import common.LETTER

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
        | "-"? VAR                       
        
        
    ?term: term ("*" | "/") factor  
        | factor

    ?factor: "(" expr ")"             
        | "-" NUMBER 
        | NUMBER
    
    NUMBER: DIGIT+     
        
    VAR: ("_"|LETTER) ("_"|LETTER|DIGIT)* 
        

    %import common.WS_INLINE
    %import common.LETTER

    %import common.DIGIT
    %import common.FLOAT
    %ignore WS_INLINE
"""


class VarDetector(Transformer):
    """ Detects if there is some expression with two 
        variables multiplied or divided. If so, it raises
        an error. Starts by visiting the leaves of the tree
        working its way up.
    Args:
        Transformer (lark.visitors.Transformer): Transformer of parse tree
    """

    def start(self, items):
        return items[0]

    def expr(self, items):
        if len(items) == 1:
            return items[0]
        else:
            left = items[0]
            right = items[1]
            return {'left': left, 'right': right}

    def linexp(self, items):
        if len(items) == 1:
            return items[0]
        else:
            return {'var': items[1]}

    def term(self, items):
        if len(items) == 1:
            return items[0]
        else:  # mult or div
            left = items[0]
            right = items[1]
            print('term: ', left, right)
            if isinstance(left, float) or isinstance(right, float):
                return {'left': left, 'right': right}
            if left['left']['is_var'] and right['left']['is_var']:
                raise serializers.ValidationError(
                    ('two variables multiplied or divided in same term'),
                    code='invalid'
                )
            print('term: ', left, right)
            return {'left': left, 'right': right}

    def factor(self, items):
        if len(items) == 1:
            return items[0]
        elif items[0] == '-':
            return -1 * float(items[1])
        else:
            return float(items[1])

    def linexp_var(self, items):
        return {'var': items[1], 'is_var': True}

    def NUMBER(self, token):
        return float(token)

    def VAR(self, token):
        return {'var': token.value, 'is_var': True}


def validate_objetive(objetive: str) -> None:
    try:
        parser = Lark(objetive_grammar, parser='lalr')
        _ = parser.parse(objetive)
    except (serializers.ValidationError, Exception) as e:
        print(e)
        raise serializers.ValidationError( 
            f'Invalid value (parse error): {objetive}'
        )


def validate_constraints(constraints: list[str]) -> None:
    try:
        for constraint in constraints:
            t = VarDetector()
            parser = Lark(constraints_grammar, parser='lalr', transformer=t)
            tree = parser.parse(constraint)
            _ = t.transform(tree)
    except Exception as e:
        print('error constraints: ', e)
        msg = ''
        if (len(e.args) > 0):
            msg = f', {e.args[0]}'

        raise serializers.ValidationError(
            f'Invalid value (parse error): {constraint}{msg}'
        )
