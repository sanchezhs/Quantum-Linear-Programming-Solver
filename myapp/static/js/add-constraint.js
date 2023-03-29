export default class AddRestriction {
    constructor (form, rmvRestriction, label) {
        this.form = form;
        this.rmvRestriction = rmvRestriction;
        this.label = label;
        // this.addMoreBtn = document.getElementById('add-more');
        // this.totalNewForms = document.getElementById('id_form-TOTAL_FORMS');
        // this.currentRestrictionForm = document.getElementsByClassName('restriction-form');
        // this.numberOfForms = this.currentRestrictionForm.length; // actual # of restrictions, initial is 1

        this.form.addMoreBtn.addEventListener('click', () => this.onClick());
    }

    onClick() {
        console.log(this.form.numberOfForms)
        if (this.form.numberOfForms >= 5) {
            console.log('maximo')
        } else {
            if (this.form.numberOfForms === 0) 
                this.label.show();
                //this.showLabel();
    
            this.createInput();
            this.createRemoveBtn();
           // this.form.numberOfForms = this.form.currentRestrictionForm.length; 
            this.form.totalNewForms.setAttribute('value', ++this.form.numberOfForms);
        }
    }

    showLabel() {
        const constraintsLabel = document.createElement('label');
        constraintsLabel.setAttribute('id', 'label-constraint-id');
        constraintsLabel.innerText = 'Subject to:';
        const target = document.getElementById('label-target');
        target.append(constraintsLabel);
    }

    createInput() {
        
        const formCopyTarget = document.getElementById('restriction-form-id');
        const copyEmptyFormEl = document.getElementById('id_constraint').cloneNode(true)
        
        // class= 'restriction-form'
        copyEmptyFormEl.setAttribute('class', 'restriction-form form-control mb-3 count')
        copyEmptyFormEl.setAttribute('id', `id_form-${this.form.numberOfForms}-constraint`)
        
        // crear boton aqui
        // const regex = new RegExp('__prefix__', 'g')
        formCopyTarget.append(copyEmptyFormEl)

       // copyEmptyFormEl.innerHTML = copyEmptyFormEl.innerHTML.replace(regex, this.form.numberOfForms)
        

    }

    createRemoveBtn() {
        const rmvBtn = document.createElement('button');
        rmvBtn.setAttribute('type', 'button');
        rmvBtn.setAttribute('id', `rmv-btn-form-${this.form.numberOfForms}`);
        rmvBtn.setAttribute('class', 'btn btn-danger mb-2');
        rmvBtn.innerText = 'Remove';

        //const target = document.getElementById(`id_form-${this.form.numberOfForms}-constraint`);
        const target = document.getElementById('restriction-form-id');
        target.append(rmvBtn);

        rmvBtn.onclick = () => this.rmvRestriction.onClick(rmvBtn.id);
    }

}