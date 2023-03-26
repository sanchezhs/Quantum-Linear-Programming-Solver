const addMoreBtn = document.getElementById('add-more');
const totalNewForms = document.getElementById('id_form-TOTAL_FORMS');

addMoreBtn.addEventListener('click', add_new_form);

function add_new_form(event) {
    if (event) {
        event.preventDefault()
    }
    const currentRestrictionForm = document.getElementsByClassName('restriction-form');
    const currentFormCount = currentRestrictionForm.length // + 1
    const formCopyTarget = document.getElementById('restriction-list')
    const copyEmptyFormEl = document.getElementById('empty-form').cloneNode(true)
    copyEmptyFormEl.setAttribute('class', 'restriction-form')
    copyEmptyFormEl.setAttribute('id', `form-${currentFormCount}`)
    const regex = new RegExp('__prefix__', 'g')
    formCopyTarget.append(copyEmptyFormEl)
    totalNewForms.setAttribute('value', currentFormCount + 1)
    copyEmptyFormEl.innerHTML = copyEmptyFormEl.innerHTML.replace(regex, currentFormCount)
    console.log(currentFormCount)
}

removeBtn = document.getElementById('remove-restriction')   
removeBtn.addEventListener('click', remove_existing_form)

function remove_existing_form(event) {
    console.log('remove btn clickled')
}
