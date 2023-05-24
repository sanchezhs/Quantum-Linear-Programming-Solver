import json
from .solver.problem import Problem
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import serializers as rest_serializers
from .validation import file_reader, form_parser
from .exceptions.exceptions import NoSolutionFoundError,InvalidFileFormatError
from . import serializers

class Api_input(viewsets.ViewSet):
    """
    ViewSet for input form, it checks if objetive and constraints are valid
    passing them to Lark parser and then it solves the problem.
    
    Args (viewsets): Viewset from django rest framework
    
    Returns: Result of solving the problem with code 201, 
             or error with code 400
    """

    serializer_class = serializers.FormDataSerializer

    def create(self, request):
        """ Get data from frontend, validate it and solve the problem

        Args:
            request: Request from frontend

        Returns:
              None
        """
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
                              request.session.get('token', ''),
                              )
            try:
                result = problem.solve(mode='qiskit')
            except NoSolutionFoundError as e:
                return Response({'status': 'error', 'infeasible': e.args}, status=400)
            except Exception as e:
                return Response({'status': 'error', 'errors': e.args}, status=400)
            return Response(result, status=201)
        return Response({'status': 'error', 'errors': serializer.errors}, status=400)


class Api_upload(viewsets.ViewSet):
    """
    ViewSet for upload page. First it checks if file is valid, then it
    passes it to Lark to parse the data and finally it solves the problem.
    
    Args (viewsets): Viewset from django rest framework
    
    Returns: Result of solving the problem with code 201, 
             or error with code 400
    """

    def create(self, request):
        """ Get file from frontend, extract data from it, validate it and solve the problem
        Args:
            request: Request from frontend

        Returns:
           None
        """
        # extract file contents from request
        contents = json.loads(request.body.decode('utf-8'))['fileContents']
        
        
        try:
            # extract problem data from file contents
            data = file_reader.file_extract_data(contents)
            
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
                              request.session.get('token', ''),
                              )
            result = problem.solve()
            
            return Response(result, status=201)
        except InvalidFileFormatError as e:
            return Response({'status': 'error', 'file_error': e.args}, status=400)
        except rest_serializers.ValidationError as e:
            return Response({'status': 'error', 'errors': e.detail}, status=400)
        except NoSolutionFoundError as e:
            return Response({'status': 'error', 'infeasible': e.args}, status=400)
        except Exception as e:
            return Response({'status': 'error', 'errors': e.args}, status=400)

class Api_settings(viewsets.ViewSet):
    """ ViewSet for settings page. It saves settings in session
        for later use in solving problems. 
    Args:
        viewsets (Viewset): Viewset from django rest framework

    Returns:
        Response: Response to frontend
    """
    
    serializer_class = serializers.SettingsDataSerializer
    def create(self, request):
        """ Get settings from frontend and save them in session
        Args:
            request: Request from frontend

        Returns:
            None
        """
        try:
            serializer = serializers.SettingsDataSerializer(data=request.data)
            print('session: ', request.session.items())
            
            if serializer.is_valid(raise_exception=True):
                request.session['upperBound'] = serializer.validated_data['upperBound']
                request.session['lowerBound'] = serializer.validated_data['lowerBound']
                request.session['seed'] = serializer.validated_data['seed']
                request.session['depth'] = serializer.validated_data['depth']
                request.session['shots'] = serializer.validated_data['shots']
                request.session['simulator'] = serializer.validated_data['simulator']
                request.session['shots'] = serializer.validated_data['shots']
                request.session['token'] = serializer.validated_data['token']
                return Response({'status': 'ok', 'data': serializer.validated_data}, status=201)
        except Exception as e:
            return Response({'status': 'error', 'errors': e.args}, status=400)