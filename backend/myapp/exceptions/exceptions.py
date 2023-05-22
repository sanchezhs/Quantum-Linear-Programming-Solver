class NoSolutionFoundError(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(self.message)
        
class InvalidFileFormatError(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(self.message)