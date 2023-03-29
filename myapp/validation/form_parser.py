from lark import Lark
from django.core.exceptions import ValidationError

class Parser():

    def __init__(self):    
        self.calc_grammar = """
            ?start: comparison
            
            ?comparison: sum ("<" | ">" | ">=" | "<=" | "=") sum    -> compare

            ?sum: product ("+" | "-") product
                | product

            ?product: power ("*" | "/") power
                | power

            ?power: primary "^" power
                | primary

            ?primary: "(" sum ")" 
                | ("+" | "-") primary   
                | IDENT
                | NUMBER
            
            NUMBER: "1".."9" DIGIT* "." DIGIT+  
                | "1".."9" DIGIT* "/" DIGIT+
                | "0" "." DIGIT*
                | "1".."9" DIGIT*   
                | "0"          

            IDENT: LETTER
            LETTER: "a" .. "z"

            %import common.CNAME -> NAME
            %import common.WS_INLINE
            %import common.DIGIT

            %ignore WS_INLINE
        """
        
"""
[0-9]*\.[0-9]+([Ee][+-]?[0-9+])?
| [0-9]+\.[0-9]*([Ee][+-]?[0-9+])?
| [0-9]+[Ee][+-]?[0-9+]
;

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

            
