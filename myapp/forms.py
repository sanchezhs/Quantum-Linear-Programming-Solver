from django import forms
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Submit, Button, Reset, Layout

class CreateNewFunction(forms.Form):
    function = forms.CharField(
        label='Function to Optimize', 
        max_length=200 
        #widget=forms.TextInput()
    )

    maximize = forms.TypedChoiceField(
        label='',
        choices=((0, 'Maximize'), (1, 'Minimize')),
        coerce=lambda x: bool(int(x)),
        widget=forms.RadioSelect,
        initial='1',
        required=True
    )


    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_id = 'form-control'
        self.form_method = 'post'
    
        

class CreateNewRestriction(forms.Form):
    restriction = forms.CharField(
        label='Restrictions', 
        max_length=250, 
        widget=forms.TextInput(), 
        required=False
    )
    

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.render_required_fields = True
        self.helper.form_tag = False
    

class ExampleFormSetHelper(FormHelper):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.form_tag = False
        self.disable_csrf = True
       # self.add_input(Button('Button', 'Add Restriction', css_class='btn-primary'))
       # self.add_input(Reset('Reset', 'Clear All', css_class='btn-primary'))
       # self.add_input(Submit('Submit', 'Submit'))
