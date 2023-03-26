export default class AddRestriction {
    constructor (form, rmvRestriction) {
        this.form = form;
        this.rmvRestriction = rmvRestriction;
        // this.addMoreBtn = document.getElementById('add-more');
        // this.totalNewForms = document.getElementById('id_form-TOTAL_FORMS');
        // this.currentRestrictionForm = document.getElementsByClassName('restriction-form');
        // this.numberOfForms = this.currentRestrictionForm.length; // actual # of restrictions, initial is 1

        this.form.addMoreBtn.addEventListener('click', () => this.onClick());
    }

    onClick() {
        this.createInput();
        this.createRemoveBtn();
    }

    createRemoveBtn() {
        const rmvBtn = document.createElement('button');
        rmvBtn.setAttribute('type', 'button');
        rmvBtn.setAttribute('id', `rmv-btn-form-${this.form.numberOfForms}`);
        rmvBtn.innerText = 'Remove';

        const target = document.getElementById(`form-${this.form.numberOfForms}`);
        target.append(rmvBtn);

        rmvBtn.onclick = () => this.rmvRestriction.onClick(rmvBtn.id);
    }

    createInput() {
        this.form.numberOfForms = this.form.currentRestrictionForm.length; 
        const formCopyTarget = document.getElementById('restriction-list')
        const copyEmptyFormEl = document.getElementById('empty-form').cloneNode(true)
    
        copyEmptyFormEl.setAttribute('class', 'restriction-form')
        copyEmptyFormEl.setAttribute('id', `form-${this.form.numberOfForms}`)
        // crear boton aqui
        const regex = new RegExp('__prefix__', 'g')
        formCopyTarget.append(copyEmptyFormEl)
    
        this.form.totalNewForms.setAttribute('value', this.form.numberOfForms + 1);
        copyEmptyFormEl.innerHTML = copyEmptyFormEl.innerHTML.replace(regex, this.form.numberOfForms)

    }

}