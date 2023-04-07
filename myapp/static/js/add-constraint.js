export default class AddRestriction {
    constructor (form, rmvRestriction, label) {
        this.form = form;
        this.rmvRestriction = rmvRestriction;
        this.label = label;
        this.form.addMoreBtn.addEventListener('click', () => this.onClick());
    }

    onClick() {
        console.log(this.form.numberOfForms)
        if (this.form.numberOfForms >= 5) {
            console.log('maximo')
        } else {
            if (this.form.numberOfForms === 0) 
                this.label.show();
    
            this.createInput();
            this.createRemoveBtn();
            this.form.totalNewForms.setAttribute('value', ++this.form.numberOfForms);
        }
    }

    createInput() {
        
        const formCopyTarget = document.getElementById('restriction-form-id');
        const copyEmptyFormEl = document.getElementById('id_constraint').cloneNode(true)
        copyEmptyFormEl.setAttribute('class', 'restriction-form form-control mb-1 count')
        copyEmptyFormEl.setAttribute('id', `id_form-${this.form.numberOfForms}-constraint`)
        formCopyTarget.append(copyEmptyFormEl)
    }

    createRemoveBtn() {
        const rmvBtn = document.createElement('button');
        rmvBtn.setAttribute('type', 'button');
        rmvBtn.setAttribute('id', `rmv-btn-form-${this.form.numberOfForms}`);
        rmvBtn.setAttribute('class', 'btn btn-outline-danger btn-sm mb-3');
        rmvBtn.innerText = 'Remove';

        const target = document.getElementById('restriction-form-id');
        target.append(rmvBtn);

        rmvBtn.onclick = () => this.rmvRestriction.onClick(rmvBtn.id);
    }

}