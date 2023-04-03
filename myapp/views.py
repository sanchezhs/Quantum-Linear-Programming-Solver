from django.shortcuts import render, redirect
from .forms import CreateNewFunction, CreateNewConstraint, ConstraintsFormSetHelper
from django.forms import formset_factory
from django.http import HttpResponse, JsonResponse


from .validation.form_parser import validate
from .validation.process import process_form

from django.core.exceptions import ValidationError


# Create your views here.

def index(request):
    formset = formset_factory(CreateNewConstraint, max_num=5, extra=0)
    formFunction = CreateNewFunction()
    helper = ConstraintsFormSetHelper()
    empty = CreateNewConstraint()

    if request.method == 'POST':
        if request.headers.get('x-requested-with') == 'XMLHttpRequest':
             print('ajax')
             data = process_form(request.POST)
             print(data)
             return JsonResponse({'status': 'ok'})
        # print(request.POST)
        data = process_form(request.POST)
        print(data)
        try:
            for k, v in data.items():
                    validate(v)
        except ValidationError as e:
            return render(request, 'index.html', {'formFunction': CreateNewFunction(),
                                          'formset': formset,
                                          'helper': helper,
                                          'empty': empty
                                        })
        return redirect('index')
    
    return render(request, 'index.html', {'formFunction': formFunction,
                                        'formset': formset,
                                        'helper': helper,
                                        'empty': empty
                                        })

    
def file_upload(request):
    # if request.headers.get('x-requested-with') == 'XMLHttpRequest':
    #      print('ajax')
    #      file = request.FILES.get('file')
    #      print(str(file.read()))
    #      return JsonResponse({"status": "success"}, status=200)
    # return HttpResponse('')
     if request.method == 'POST':
          file = request.FILES.get('file')
          print(str(file.read()))
    
          return HttpResponse('')
     return JsonResponse({'post': 'false'})