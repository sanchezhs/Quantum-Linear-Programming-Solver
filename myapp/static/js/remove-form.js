export default class RemoveRestriction {
    constructor(form) {
        this.form = form;
    }

    onClick(id) {
        console.log(id);
        const id_form = `form-${id.slice(-1)}`; // form-x => x
        document.getElementById(id_form).remove();
        this.form.totalNewForms.setAttribute('value', this.form.numberOfForms--);
    }
}