from django import forms
from .validation.form_parser import validate

class CreateNewFunction(forms.Form):
    function = forms.CharField(label='Function to Optimize', max_length=200, widget=forms.TextInput())
    maximize = forms.BooleanField(label='Maximize?', required=False)
    

class CreateNewRestriction(forms.Form):
    restriction = forms.CharField(label='Restriction', max_length=250, widget=forms.TextInput(), required=False)
    
