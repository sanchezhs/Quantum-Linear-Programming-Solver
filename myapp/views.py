from django.shortcuts import render
from django.forms import formset_factory
from django.http import  JsonResponse
from .forms import CreateNewFunction, CreateNewConstraint, ConstraintsFormSetHelper
from .validation.file_parser import read_string
from mysite.exceptions import FileSyntaxError
from .sympy import Sympy

# Create your views here.



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
        objetive = CreateNewFunction(request.POST)
        constraints = formset(request.POST)
        if objetive.is_valid() and all([form.is_valid() for form in constraints]):
            sympy = Sympy(objetive.cleaned_data, [form.cleaned_data for form in constraints])
            return JsonResponse({'status': 'ok'}, status=200)
        else:
            return JsonResponse({'status': 'error', 
                                 'errors': {'objetive': objetive.errors.as_json(), 
                                            'constraints': [form.errors.as_json() for form in constraints]}},
                                status=200)

    return JsonResponse({'status': 'ok'}, status=200)


def check_for_duplicates_in_list_of_dicts(list_of_dicts):
    seen = set()
    for d in list_of_dicts:
        t = tuple(d.items())
        if t in seen:
            return True
        seen.add(t)
    return False


def file_upload(request):
    if request.method == 'POST':
        file = request.FILES.get('file')
        try:
            f, c = read_string(str(file.read().decode('utf-8')))
            print(file.read().decode('utf-8'))
            print(f,c)
        except FileSyntaxError:
            return JsonResponse({'status': 'error'})
        return JsonResponse({'status': 'ok'}) 

    return JsonResponse({'post': 'false'})

def about(request):
    return render(request, 'about.html')