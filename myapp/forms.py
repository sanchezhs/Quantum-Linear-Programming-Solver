from django import forms


class CreateNewFunction(forms.Form):
    function = forms.CharField(label='Function to Optimize', max_length=200, widget=forms.TextInput())
    maximize = forms.BooleanField(label='Maximize?', required=False)

class CreateNewRestriction(forms.Form):
    restriction = forms.CharField(label='Restriction', max_length=250, widget=forms.TextInput(), required=False)
    
