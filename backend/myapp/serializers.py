from rest_framework import serializers
from .validation import form_parser


class FormData(object):
    def __init__(self, objetive, constraints, radioValue):
        self.objetive = objetive
        self.constraints = constraints
        self.radioValue = radioValue


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

class SettingsData(object):
    def __init__(self, upperbound, lowerbund, depth, seed, shots, simulator, token):
        self.upperbound = upperbound
        self.lowerbund = lowerbund
        self.depth = depth
        self.seed = seed
        self.shots = shots
        self.simulator = simulator
        self.token = token
        
class SettingsDataSerializer(serializers.Serializer):
    upperBound = serializers.CharField()
    lowerBound = serializers.CharField()
    depth = serializers.CharField()
    seed = serializers.CharField()
    shots = serializers.CharField()
    simulator = serializers.BooleanField()
    token = serializers.CharField()
    
    def create(self, validated_data):
        return SettingsData(**validated_data)
    
    def update(self, instance, validated_data):
        instance.upperBound = validated_data.get('upperBound', instance.upperBound)
        instance.lowerBound = validated_data.get('lowerBound', instance.lowerBound)
        instance.depth = validated_data.get('depth', instance.depth)
        instance.seed = validated_data.get('seed', instance.seed)
        instance.shots = validated_data.get('shots', instance.shots)
        instance.simulator = validated_data.get('simulator', instance.simulator)
        instance.token = validated_data.get('token', instance.token)
        
        return instance