class FileSyntaxError(Exception):
    def __init__(self, message="Error: Check if your file has syntax errors."):
        self.message = message
        super().__init__(self.message)

class ObjetiveSyntaxError(Exception):
    def __init__(self, message="Error: Check if your constraint '%(name)s' has syntax errors.", 
                 code=None, params=None):
        self.message = message
        self.code = code
        self.params = params 
        super().__init__(self.message)   

    def __str__(self):
        return self.message % self.params

class ConstraintSyntaxError(Exception):
    def __init__(self, message="Error: Check if your constraint '%(name)s' has syntax errors.", 
                 code=None, params=None):
        self.message = message
        self.code = code
        self.params = params  
        super().__init__(self.message)     

    def __str__(self):
        return self.message % self.params