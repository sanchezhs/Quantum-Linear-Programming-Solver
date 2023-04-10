export default class AddRestriction {
    constructor (form, rmvRestriction, label) {
        this.form = form;
        this.rmvRestriction = rmvRestriction;
        this.label = label;
        this.form.addMoreBtn.addEventListener('click', () => this.onClick());
    }

    onClick() {
        if (this.form.numberOfForms >= 5) {
            //alert('You have reached the maximum numbers of constraints. Try uploading a file instead.');
            $('#max-constraint-modal').modal('show');
        } else {
            if (this.form.numberOfForms === 0) 
                this.label.show();
    
            this.createInputGroup();
            this.form.totalNewForms.setAttribute('value', ++this.form.numberOfForms);
        }
    }

    createInput() {
        const copyEmptyFormEl = document.getElementById('id_constraint').cloneNode(true)
        copyEmptyFormEl.setAttribute('name', `form-${this.form.numberOfForms}-constraint`)
        copyEmptyFormEl.setAttribute('class', 'restriction-form form-control mb-2 count')
        copyEmptyFormEl.setAttribute('id', `id_form-${this.form.numberOfForms}-constraint`)
  
        return copyEmptyFormEl;
    }

    createRemoveBtn(id) {
        const rmvBtn = document.createElement('button');
        rmvBtn.setAttribute('type', 'button');
        rmvBtn.setAttribute('id', `rmv-btn-form-${this.form.numberOfForms}`);
        rmvBtn.setAttribute('class', 'btn btn-outline-danger mb-2');
        rmvBtn.innerText = 'Remove';
        rmvBtn.onclick = () => this.rmvRestriction.onClick(id);
 
        return rmvBtn;
    }

    createInputGroup() {
        const input = this.createInput();
        const inputGroup = document.createElement('div');
        inputGroup.setAttribute('class', 'input-group');
        inputGroup.setAttribute('id', `input-group-form-${this.form.numberOfForms}`);
        const rmvBtn = this.createRemoveBtn(`input-group-form-${this.form.numberOfForms}`);
        inputGroup.appendChild(input);
        inputGroup.appendChild(rmvBtn);
        const target = document.getElementById('restriction-form-id');
        target.append(inputGroup);
    }

}