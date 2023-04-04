from django import forms
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Submit, Button, Reset, Layout, Field

class CreateNewFunction(forms.Form):
    function = forms.CharField(
        label='Optimize', 
        max_length=200,
    )

    optimizationType = forms.TypedChoiceField(
        label='',
        choices=((0, 'Minimize'), (1, 'Maximize')),
        coerce=lambda x: bool(int(x)),
        widget=forms.RadioSelect,
        initial='0',
        required=True
    )


    def __init__(self, *args, **kwargs):
        super(CreateNewFunction, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_tag = False    
        self.fields['function'].widget.attrs['placeholder'] = 'x + 2*y - 4*z + 2'
        

class CreateNewConstraint(forms.Form):
    constraint = forms.CharField(
        label='', # Constraints
        max_length=250, 
        widget=forms.TextInput(), 
        required=True
    )
    

    def __init__(self, *args, **kwargs):
        super(CreateNewConstraint, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.render_required_fields = True
        self.helper.form_tag = False
        self.fields['constraint'].widget.attrs['placeholder'] = 'x < 1'

class ConstraintsFormSetHelper(FormHelper):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.form_tag = False
        self.disable_csrf = True
