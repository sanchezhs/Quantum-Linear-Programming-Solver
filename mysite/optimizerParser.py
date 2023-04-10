from lark import Lark, Transformer, v_args, Visitor
from sympy import symbols, factor, simplify
import sys, logging
import re

logging.basicConfig(filename='example.log', filemode='w', level=logging.DEBUG)


grammar = """
    ?start: expr
    
    ?comparison: expr ("<" | ">" | ">=" | "<=" | "=") expr -> expr

    ?expr: expr ("+" | "-") term   
        | expr ("+" | "-") linexp  
        | term                     
        | linexp                   

    ?linexp: "(" linexp ")"         
        | factor VAR                -> nvar
        | VAR                       -> var
        
    ?term: term ("*" | "/") factor  
        | factor                   

    ?factor: "(" expr ")"          
        | "-" number               -> unumber
        | number                   -> number
    
    ?number:  DIGIT+
            | FLOAT
        
        
    VAR: "a" .. "z"


    %import common.WS_INLINE
    %import common.DIGIT
    %import common.FLOAT
    %ignore WS_INLINE
"""

class TestTree(Transformer):
    def __init__(self):
        self.vars = {}

    def expr(self, e1):
        print(e1)
        return e1

""" @v_args(inline=True)    # Affects the signatures of the methods
class CalculateTree(Visitor):

    def __init__(self):
        self.vars = {}
        self.lhs_cte = 0
        self.rhs_cte = 0
        # x_1: 2, y: 4, z_2: 10,...

    def nvar(self, tree):
        assert tree.data == 'nvar'
        coef = int(tree.children[0].value)
        var = tree.children[1].value
        if not self.vars:
             self.vars[var] = coef
        else:
            if var not in self.vars:
                 self.vars[var] = coef
            else:
                self.vars[var] += coef

    def var(self, tree):
         var = tree.children[0].value
         if not self.vars or var not in self.vars:
            self.vars[var] = 1
         else:
            self.vars[var] += 1

    def number(self, n):
        pass

    def comp(self, expr):
        print('children: 1', expr.children[0])

    def print_vars(self):
        print(self.vars) """


if __name__ == '__main__':
        calc_parser = Lark(grammar, parser='lalr', debug=True)
        calc = calc_parser.parse
        print(calc(sys.argv[1]).pretty())
"""         c_tree = CalculateTree()
        c_tree.visit(calc(sys.argv[1]))
        c_tree.print_vars() """

