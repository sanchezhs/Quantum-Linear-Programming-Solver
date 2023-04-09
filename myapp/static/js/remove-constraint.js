export default class RemoveRestriction {
    constructor(form, label) {
        this.form = form;
        this.label = label;
    }

    onClick(id) {    
        if (this.form.numberOfForms === 1)
            this.label.hide();

        const id_number = id.match(/\d+/)[0]
        const id_form = `id_form-${id_number}-constraint`; // form-x => x
        
        document.getElementById(id_form).remove();
        document.getElementById(id).remove();
        this.form.totalNewForms.setAttribute('value', --this.form.numberOfForms);
        console.log('remove clicled', this.form.numberOfForms)
    }
}