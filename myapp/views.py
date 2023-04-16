from django.shortcuts import render
from django.forms import formset_factory
from django.http import JsonResponse
from .forms import CreateNewFunction, CreateNewConstraint, ConstraintsFormSetHelper
from .validation.file_reader import extract_data
from mysite.exceptions import FileSyntaxError
from .sympy import Sympy
from rest_framework import viewsets
from django.middleware.csrf import get_token
import json

# Create your views here.

MAX_CONSTRAINTS = 5
AJAX_REQUEST = 'XMLHttpRequest'

def index(request):
    formset = formset_factory(
        CreateNewConstraint, max_num=MAX_CONSTRAINTS, extra=0)
    formFunction = CreateNewFunction()
    helper = ConstraintsFormSetHelper()
    empty = CreateNewConstraint()

    if request.method == 'GET':
        return JsonResponse({'csrfToken': get_token(request)})
        return render(request, 'index.html', {'formFunction': formFunction,
                                              'formset': formset,
                                              'helper': helper,
                                              'empty': empty
                                              })
    if request.method == 'POST':
        print('desde React')
        print(json.loads(request.body.decode('utf-8')))
    if request.headers.get('x-requested-with') == AJAX_REQUEST:
        objetive = CreateNewFunction(request.POST)
        constraints = formset(request.POST)
        if objetive.is_valid() and all([form.is_valid() for form in constraints]):
            sympy = Sympy(objetive.cleaned_data, [
                          form.cleaned_data for form in constraints])
            return JsonResponse({'status': 'ok',
                                 'sympy': sympy.toJSON()}, status=200)
        else:
            return JsonResponse({'status': 'error',
                                 'errors': {'objetive': objetive.errors.as_json(),
                                            'constraints': [form.errors.as_json() for form in constraints]}},
                                status=400)

    return JsonResponse({'status': 'ok'}, status=200)


def file_upload(request):
    if request.method == 'POST':
        file = request.FILES.get('file')
        try:
            file_contents = str(file.read().decode('utf-8'))
            objetive, constraints = extract_data(file_contents)
            print(objetive, '\n', constraints)
            return JsonResponse({'status': 'ok', 'objetive': objetive, 'constraints': constraints})
        except FileSyntaxError:
            return JsonResponse({'status': 'error'})

    return JsonResponse({'post': 'false'})


def how_to(request):
    return render(request, 'how_to.html', {'max_constraints': MAX_CONSTRAINTS})


def check_for_duplicates_in_list_of_dicts(list_of_dicts):
    seen = set()
    for d in list_of_dicts:
        t = tuple(d.items())
        if t in seen:
            return True
        seen.add(t)
    return False
