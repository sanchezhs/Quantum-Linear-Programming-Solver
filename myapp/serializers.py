from rest_framework import serializers
from .validation import form_parser

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
    
"""     def validate(self, attrs):
        objetive = attrs['objetive']
        constraints = attrs['constraints']
        radioValue = attrs['radioValue']
        form_parser.validate_objetive(objetive)
        print(objetive, constraints, radioValue)
        for constraint in constraints:
            form_parser.validate_constraints(constraint)
        return (
            {
                'objetive': objetive,
                'constraints': constraints,
                'radioValue': radioValue
            }
        )
         """