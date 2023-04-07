class FileSyntaxError(Exception):
    def __init__(self, message="Error: Check if your file has syntax errors."):
        self.message = message
        super().__init__(self.message)
