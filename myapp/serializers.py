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
    radioValue = serializers.CharField()
    
    def create(self, validated_data):
        return FormData(**validated_data)
    
    def update(self, instance, validated_data):
        instance.objetive = validated_data.get('objetive', instance.objetive)
        instance.constraints = validated_data.get('constraints', instance.constraints)
        instance.radioValue = validated_data.get('radioValue', instance.radioValue)
        return instance

class FileData:
    def __init__(self, fileContents):
        self.fileContents = fileContents
            
    

class FileSerializer(serializers.Serializer):
    fileContents = serializers.CharField(validators=[file_reader.extract_data])
    
    def create(self, validated_data):
        return FileData(**validated_data)
    
    def update(self, instance, validated_data):
        instance.fileContents = validated_data.get('fileContents', instance.fileContents)
        return instance