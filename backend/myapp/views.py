from .solver.problem import Problem
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import serializers as rest_serializers
from .validation import file_reader, form_parser
from .utils import ibm
from . import serializers
import json


class Api_index(viewsets.ViewSet):
    """
    ViewSet for input form, it checks if objetive and constraints are valid
    passing them to Lark parser and then it solves the problem.
    """

    serializer_class = serializers.FormDataSerializer

    def create(self, request):
        serializer = serializers.FormDataSerializer(data=request.data)
        if serializer.is_valid():
            
            problem = Problem(serializer.data['objetive'], 
                              serializer.data['constraints'],
                              serializer.data['radioValue'],
                              request.session.get('upperBound', 10),
                              request.session.get('lowerBound', 0),
                              request.session.get('seed', 0),
                              request.session.get('depth', 1),
                              request.session.get('shots', 1000),
                              request.session.get('simulator', True),
                              )
            try:
                result = problem.solve(mode='qiskit')
            except Exception as e:
                print(e.args)
                return Response({'status': 'error', 'errors': e.args}, status=400)
            return Response(result, status=201)
        print('serializer errors: ', serializer.errors)
        return Response({'status': 'error', 'errors': serializer.errors}, status=400)


class Api_upload(viewsets.ViewSet):
    """
    ViewSet for upload page. First it checks if file is valid, then it
    passes it to Lark to parse the data and finally it solves the problem.
    """

    def create(self, request):
        # extract file contents from request
        contents = json.loads(request.body.decode('utf-8'))['fileContents']
        
        # extract problem data from file contents
        data = file_reader.file_extract_data(contents)
        
        try:
            # validate objective and constraints
            form_parser.validate_objetive(data['objetive'])
            form_parser.validate_constraints(data['constraints'])
            
            # create and solve problem
            problem = Problem(data['objetive'], 
                              data['constraints'], 
                              data['type'], 
                              request.session.get('upperBound', 10),
                              request.session.get('lowerBound', 0),
                              request.session.get('seed', 0),
                              request.session.get('depth', 1),
                              request.session.get('shots', 1000),
                              request.session.get('simulator', True),
                              )
            result = problem.solve()
            
            return Response(result, status=201)
        except rest_serializers.ValidationError as e:
            return Response({'status': 'error', 'errors': e.detail}, status=400)
        except Exception as e:
            return Response({'status': 'error', 'errors': e.args}, status=400)

class Api_settings(viewsets.ViewSet):
    
    serializer_class = serializers.SettingsDataSerializer
    def create(self, request):
        serializer = serializers.SettingsDataSerializer(data=request.data)
        print('session: ', request.session.items())
        
        if serializer.is_valid():
            request.session['upperBound'] = serializer.validated_data['upperBound']
            request.session['lowerBound'] = serializer.validated_data['lowerBound']
            request.session['seed'] = serializer.validated_data['seed']
            request.session['depth'] = serializer.validated_data['depth']
            request.session['shots'] = serializer.validated_data['shots']
            request.session['simulator'] = serializer.validated_data['simulator']
            request.session['shots'] = serializer.validated_data['shots']
            return Response({'status': 'ok', 'data': serializer.validated_data}, status=201)


class Api_ibm(viewsets.ViewSet):

    selializer_class = serializers.TokenSerializer

    def create(self, request):
        print('ibm ', request.data)
        serializer = serializers.TokenSerializer(data=request.data)
        if serializer.is_valid():
            # serializer.save()
            print('serializer data: ', serializer.data['apiToken'])
            try:
                backends = ibm.get_backends(serializer.data['apiToken'])
                return Response({'status': 'ok', 'backends': backends}, status=201)
            except Exception as e:
                return Response({'status': 'error', 'errors': e.args}, status=400)
        return Response({'status': 'error', 'errors': serializer.errors}, status=400)
