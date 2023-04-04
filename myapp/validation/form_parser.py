from lark import Lark
from django.core.exceptions import ValidationError

class Parser():

    def __init__(self):    
        self.calc_grammar = """
            ?start: comparison
            
            ?comparison: expr ("<" | ">" | ">=" | "<=" | "=") expr

            ?expr: expr ("+" | "-") term
                | linexp (("+" | "-") term)?
                | term

            ?linexp: linexp ("+"|"-") VAR
                | "(" linexp ")"
                | NUMBER "*" VAR
                | VAR
                
            ?term: term ("*" | "/") factor
                | factor

            ?factor: "(" expr ")" 
                | NUMBER
            
            NUMBER: DIGIT+        
            VAR: "a" .. "z"


            %import common.WS_INLINE
            %import common.DIGIT

            %ignore WS_INLINE
        """
        
p = Parser()
def validate(str):
    print(str)
    try:
        calc_parser = Lark(p.calc_grammar, parser='lalr') 
        calc = calc_parser.parse
        print(calc(str))
    except:
        raise ValidationError(
                ('Invalid value (parse error): %(value)s'),
                code='invalid',
                params={'value': str},
        )

            
