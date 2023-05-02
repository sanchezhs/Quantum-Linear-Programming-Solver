from rest_framework import serializers
from .validation import form_parser, file_reader


class FormData(object):
    def __init__(self, objetive, constraints, radioValue):
        self.objetive = objetive
        self.constraints = constraints
        self.radioValue = radioValue

formdata = FormData(objetive='x', constraints=['x < 1'], radioValue='z')

class FormDataSerializer(serializers.Serializer):
    objetive = serializers.CharField(validators=[form_parser.validate_objetive])
    constraints = serializers.ListField(validators=[form_parser.validate_constraints])
    upperBound = serializers.CharField()
    p = serializers.CharField()
    radioValue = serializers.CharField()
    
    def create(self, validated_data):
        return FormData(**validated_data)
    
    def update(self, instance, validated_data):
        instance.objetive = validated_data.get('objetive', instance.objetive)
        instance.constraints = validated_data.get('constraints', instance.constraints)
        instance.radioValue = validated_data.get('radioValue', instance.radioValue)
        instance.upperBound = validated_data.get('upperBound', instance.upperBound)
        instance.p = validated_data.get('p', instance.p)
        
        return instance

class FileData:
    def __init__(self, objetive, constraints):
        self.objetive = objetive
        self.constraints = constraints
            
    

class FileSerializer(serializers.Serializer):
    #fileContents = serializers.CharField(validators=[file_reader.extract_data])
    objetive = serializers.CharField(validators=[form_parser.validate_objetive])
    contraints = serializers.CharField(validators=[form_parser.validate_constraints])
    
    def create(self, validated_data):
        return FileData(**validated_data)
    
    def update(self, instance, validated_data):
        instance.objetive = validated_data.get('objetive', instance.objetive)
        instance.constraints = validated_data.get('constraints', instance.constraints)
        return instance
    
class Token:
    def __init__(self, apiToken):
        self.apiToken = apiToken
    
class TokenSerializer(serializers.Serializer):
    apiToken = serializers.CharField()
    
    def create(self, validated_data):
        return Token(**validated_data)
    
    def update(self, instance, validated_data):
        instance.apiToken = validated_data.get('apiToken', instance.apiToken)
        return instance