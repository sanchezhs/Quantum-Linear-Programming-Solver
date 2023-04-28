from .sympy import Sympy
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import serializers as rest_serializers
from .validation import file_reader, form_parser
from .qiskit_ibm import ibm
from . import serializers
import json


class Api_index(viewsets.ViewSet):
    """
    ViewSet for index page, it checks if objetive and constraints are valid
    passing them to Lark parser.
    """

    serializer_class = serializers.FormDataSerializer

    def create(self, request):
        serializer = serializers.FormDataSerializer(data=request.data)
        if serializer.is_valid():
            # serializer.save()
            
            sympy = Sympy(serializer.data.get('objetive', None),
                          serializer.data.get('constraints', None),
                          serializer.data.get('radioValue', None))
            test = sympy.solve()
            return Response(test, status=201)
        print(serializer.errors)
        return Response({'status': 'error', 'errors': serializer.errors}, status=400)


class Api_upload(viewsets.ViewSet):
    """
    ViewSet for upload page. First it checks if file is valid, then it
    passes it to Lark to parse the data.
    """

    serializer_class = serializers.FileSerializer

    def create(self, request):
        print('view: ', request.body.decode('utf-8'))
        contents = request.body.decode('utf-8')
        contents = json.loads(contents)['fileContents']
        objetive, constraints, type = file_reader.file_extract_data(contents)
        try:
            form_parser.validate_objetive(objetive)
            form_parser.validate_constraints(constraints)
            return Response({'status': 'ok'}, status=201)
        except rest_serializers.ValidationError as e:
            return Response({'status': 'error', 'errors': e.detail}, status=400)


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
