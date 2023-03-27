from django.shortcuts import render, redirect
from .forms import CreateNewFunction, CreateNewRestriction
from django.forms import formset_factory
import re

from .validation.form_parser import validate
from .validation.process import process_form

from django.core.exceptions import ValidationError


# Create your views here.

def index(request):
    formset = formset_factory(CreateNewRestriction, max_num=5, extra=1)
    formFunction = CreateNewFunction()
    if request.method == 'GET':
        return render(request, 'index2.html', {'formFunction': formFunction,
                                          'formset': formset,
                                          'error': False})
    else:
        data = process_form(request.POST)
        try:
            for k, v in data.items():
                if k != 'maximize':
                    validate(v)
        except ValidationError as e:
            return render(request, 'index2.html', {'formFunction': CreateNewFunction(),
                                          'formset': formset,
                                          'error': True})
        return redirect('index')

    
