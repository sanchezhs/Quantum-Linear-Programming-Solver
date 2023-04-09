from django import forms
from crispy_forms.helper import FormHelper
from .validation.form_parser import validate_objetive, validate_constraints

class CreateNewFunction(forms.Form):
    function = forms.CharField(
        label='Optimize', 
        max_length=200,
        validators=[validate_objetive],
        error_messages={'required': 'Please enter a function to optimize', 'invalid': 'Invalid function'},
    )

    optimizationType = forms.TypedChoiceField(
        label='',
        choices=((0, 'Minimize'), (1, 'Maximize')),
        coerce=lambda x: 'Minimize' if x == '0' else 'Maximize', 
        widget=forms.RadioSelect,
        initial='0',
        required=True
    )


    def __init__(self, *args, **kwargs):
        super(CreateNewFunction, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_tag = False    
        self.fields['function'].widget.attrs['placeholder'] = 'x + 2y - 4z + 2'
        
    def clean(self):
        return super().clean()

class CreateNewConstraint(forms.Form):
    constraint = forms.CharField(
        label='', # Constraints
        max_length=250, 
        widget=forms.TextInput(), 
        required=True,
        validators=[validate_constraints],
    )
    
    def __init__(self, *args, **kwargs):
        super(CreateNewConstraint, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.render_required_fields = True
        self.helper.form_tag = False
        self.fields['constraint'].widget.attrs['placeholder'] = 'x < 1'

    def clean(self):
        return super().clean()

class ConstraintsFormSetHelper(FormHelper):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.form_tag = False
        self.disable_csrf = True
