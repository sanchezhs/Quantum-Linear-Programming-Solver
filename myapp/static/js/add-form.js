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
        
        if (this.form.numberOfForms >= 5) {
            console.log('maximo')
        } else {
            this.createInput();
            this.createRemoveBtn();
        }
    }

    createRemoveBtn() {
        console.log(this.form.numberOfForms);
        const rmvBtn = document.createElement('button');
        rmvBtn.setAttribute('type', 'button');
        rmvBtn.setAttribute('id', `rmv-btn-form-${this.form.numberOfForms}`);
        rmvBtn.setAttribute('class', 'btn btn-danger');
        rmvBtn.innerText = 'Remove';

        const target = document.getElementById(`form-${this.form.numberOfForms}`);
        target.append(rmvBtn);

        rmvBtn.onclick = () => this.rmvRestriction.onClick(rmvBtn.id);
    }

    createInput() {
    
        this.form.numberOfForms = this.form.currentRestrictionForm.length; 
        const formCopyTarget = document.getElementById('restriction-form-id');
        const copyEmptyFormEl = document.getElementById('empty-form').cloneNode(true)
    
        // class= 'restriction-form'
        copyEmptyFormEl.setAttribute('class', 'restriction-form form-control mb-3')
        copyEmptyFormEl.setAttribute('id', `form-${this.form.numberOfForms}`)
        // crear boton aqui
        const regex = new RegExp('__prefix__', 'g')
        formCopyTarget.append(copyEmptyFormEl)

        this.form.totalNewForms.setAttribute('value', this.form.numberOfForms + 1);
        copyEmptyFormEl.innerHTML = copyEmptyFormEl.innerHTML.replace(regex, this.form.numberOfForms)
        
    }

}