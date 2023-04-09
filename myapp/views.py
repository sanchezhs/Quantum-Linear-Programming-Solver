from django.shortcuts import render
from django.forms import formset_factory
from django.http import HttpResponse, JsonResponse, HttpResponseServerError
from django.core.exceptions import ValidationError
from .forms import CreateNewFunction, CreateNewConstraint, ConstraintsFormSetHelper
from .validation.form_parser import validate_forms
from .validation.process import process_form
from .validation.file_parser import read_string
from mysite.exceptions import FileSyntaxError
import re
from sympy import simplify
# Create your views here.

def insert_mult_operator(s):
    s = re.sub(r'(\d)([a-zA-Z])', r'\1*\2', s)
    s = re.sub(r'([a-zA-Z])(\d)', r'\1*\2', s)
    return s

def index(request):
    AJAX_REQUEST = 'XMLHttpRequest'
    formset = formset_factory(CreateNewConstraint, max_num=5, extra=0)
    formFunction = CreateNewFunction()
    helper = ConstraintsFormSetHelper()
    empty = CreateNewConstraint()

    if request.method == 'GET':
        return render(request, 'index.html', {'formFunction': formFunction,
                                            'formset': formset,
                                            'helper': helper,
                                            'empty': empty
                                            })        

    if request.headers.get('x-requested-with') == AJAX_REQUEST:
        objetive, constraints = process_form(request.POST)
        try:
            validate_forms(objetive, constraints)
        except ValidationError as e:
            if e.code == 'objetive':
                return JsonResponse({'status': 'error'})
            elif e.code == 'constraints':
                return JsonResponse({'status': 'error',
                                    'constraint_name': e.params['name']})
            elif e.code == 'duplicated':
                print(e.params)
            else:
                return JsonResponse({'status': 'error'})
            
    return JsonResponse({'status': 'ok'})
"""         print(objetive, '\n', constraints)
        try:
            validate_objetive(objetive['function'])
            print(simplify(insert_mult_operator(objetive['function'])))
            if constraints:
                for name, constraint in constraints.items():
                    validate_constraints(name, constraint)
        except ValidationError as e:
            print(e.params)                
            if constraints and not e.params['objetive']:
                return JsonResponse({'status': 'error',
                                    'constraint_name': e.params['name']})
            else:
                return JsonResponse({'status': 'error'})
 """




def file_upload(request):
    if request.method == 'POST':
        file = request.FILES.get('file')
        try:
            f, c = read_string(str(file.read().decode('utf-8')))
            print(f,c)
        except FileSyntaxError:
            return JsonResponse({'status': 'error'}) # HttpResponseServerError('')
        return JsonResponse({'status': 'ok'}) #HttpResponse('')

    return JsonResponse({'post': 'false'})

def about(request):
    return render(request, 'about.html')