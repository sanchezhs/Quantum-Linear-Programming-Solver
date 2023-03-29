export default class Form {
    constructor() {
        this.addMoreBtn = document.getElementById('add-more');
        this.totalNewForms = document.getElementById('id_form-TOTAL_FORMS');
        this.currentRestrictionForm = document.getElementsByClassName('count');
        this.numberOfForms = this.currentRestrictionForm.length; 
    }
}