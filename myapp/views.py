from django.shortcuts import render
from django.forms import formset_factory
from django.http import HttpResponse, JsonResponse, HttpResponseServerError
from django.core.exceptions import ValidationError
from .forms import CreateNewFunction, CreateNewConstraint, ConstraintsFormSetHelper
from .validation.form_parser import validate
from .validation.process import process_form
from .validation.file_parser import read_string, read_file
from mysite.exceptions import FileSyntaxError
# Create your views here.


def index(request):
    formset = formset_factory(CreateNewConstraint, max_num=5, extra=0)
    formFunction = CreateNewFunction()
    helper = ConstraintsFormSetHelper()
    empty = CreateNewConstraint()

    if request.method == 'POST':
        if request.headers.get('x-requested-with') == 'XMLHttpRequest':
            data = process_form(request.POST)
            try:
                for k, v in data.items():
                    if k not in ['max', 'min']:
                        print('Valor:  ', v)
                        validate(v)
            except ValidationError as e:
                return JsonResponse({'status': 'error'})

        return JsonResponse({'status': 'ok'})

    return render(request, 'index.html', {'formFunction': formFunction,
                                          'formset': formset,
                                          'helper': helper,
                                          'empty': empty
                                          })


def file_upload(request):
    if request.method == 'POST':
        file = request.FILES.get('file')
        try:
            f, c = read_string(str(file.read().decode('utf-8')))
            print(f,c)
        except FileSyntaxError:
            return JsonResponse({'status': 'error'}) # HttpResponseServerError('')
        return JsonResponse({'success': 'ok'}) #HttpResponse('')

    return JsonResponse({'post': 'false'})
