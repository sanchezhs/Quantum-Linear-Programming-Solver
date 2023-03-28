from lark import Lark, Transformer, v_args
import sys

calc_grammar2 = """
    ?start: exp

    ?exp: addexp "<" addexp    -> less
        | addexp ">" addexp     -> greater
        | addexp ">=" addexp    -> greatereq
        | addexp "<=" addexp    -> lesseq
        | addexp "=" addexp     -> equal
          
    ?addexp: addexp "+" mulexp  
        | addexp "-" mulexp  
        | mulexp

    ?mulexp: mulexp "*" expexp  
        | mulexp "/" expexp  
        | expexp

    ?expexp: priexp "^" expexp  
        | priexp

    ?priexp: "(" exp ")" 
        | "+" priexp   
        | "-" priexp   
        | IDENT
        | NUMBER
    
    NUMBER: "0".."9" DIGIT* "." DIGIT+  
        | DIGIT+       

    IDENT: LETTER
    LETTER: "a" .. "z"

    %import common.CNAME -> NAME
    %import common.WS_INLINE
    %import common.DIGIT

    %ignore WS_INLINE
"""
calc_grammar = """
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

@v_args(inline=True)    # Affects the signatures of the methods
class CalculateTree(Transformer):

    def __init__(self):
        self.vars = []
    
if __name__ == '__main__':
    try:
        calc_parser = Lark(calc_grammar, parser='lalr', transformer=CalculateTree())
        calc = calc_parser.parse
        print(calc(sys.argv[1]))
        print('valid string')
    except:
        print('invalid string')