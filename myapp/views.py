from django.shortcuts import render, redirect
from .models import Function, Restriction
from .forms import CreateNewFunction, CreateNewRestriction
from django.forms import formset_factory
import re

# Create your views here.

def index(request):
    if request.method == 'GET':
        formset = formset_factory(CreateNewRestriction, extra=1)
        return render(request, 'index2.html', {'formFunction': CreateNewFunction(),
                                          'formset': formset})
    else:
        #maximize = request.POST.get('maximize', False)
        store_function_and_restrictions(request.POST)
        return redirect('index')
    
def store_function_and_restrictions(query_dict):
    data = {}
    regex = r'^form-\d+-restriction$'
    for key, value in query_dict.items():
        if key == 'function':
            data['function'] = value
        elif key == 'maximize':
            data['maximize'] = True
        elif re.match(regex, key):
            if len(value) != 0:
                form_id = key.split('-')[1]
                data[f'form-{form_id}-restriction'] = value
            else:
                form_id = key.split('-')[1]
                data[f'form-{form_id}-restriction'] = ''
        data['maximize'] = False
    print(data)
    #return data