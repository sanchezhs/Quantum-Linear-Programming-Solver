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
            this.alerta('Max number of restrictions', 'success');
        } else {
            this.createInput();
            this.createRemoveBtn();
        }
    }


    alerta(message, type) {
        const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
          ].join('')
        
        alertPlaceholder.append(wrapper);  
        alertPlaceholder.removeAttribute('class', 'd-none');
        const alertTrigger = document.getElementsByClassName('btn-close')[0]
        if (alertTrigger) {
        alertTrigger.addEventListener('click', () => {
            alertPlaceholder.setAttribute('class', 'd-none');
        })
        }
  
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
        const formCopyTarget = document.getElementById('restriction-form')
        const copyEmptyFormEl = document.getElementById('empty-form').cloneNode(true)
    
        // class= 'restriction-form'
        copyEmptyFormEl.setAttribute('class', 'restriction-form form-control mb-3')
        copyEmptyFormEl.setAttribute('id', `form-${this.form.numberOfForms}`)
        // crear boton aqui
        const regex = new RegExp('__prefix__', 'g')
        formCopyTarget.append(copyEmptyFormEl)
        console.log('# forms', this.form.numberOfForms)
        this.form.totalNewForms.setAttribute('value', this.form.numberOfForms + 1);
        copyEmptyFormEl.innerHTML = copyEmptyFormEl.innerHTML.replace(regex, this.form.numberOfForms)
        
    }

}