const form = document.querySelector('#form');
form.addEventListener('submit', sendForm);

function sendForm(event) {
    event.preventDefault();
    const loadingIcon = document.querySelector('#loading-icon');
    loadingIcon.classList.remove('d-none');
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const request = new Request(
        '',
        {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrfToken, 
                'X-Requested-With': 'XMLHttpRequest',
            },
            mode: 'same-origin',
            body: new FormData(form),
        }
    );
    fetch(request)
        .then((response) => {
            loadingIcon.classList.add('d-none');
            if (response.ok) {
                return response.json();
            } 
            throw new Error('Network response was not ok.');
        })
        .then(function(data) {
            if (data && data.status === 'ok') {
                alert('Mensaje enviado correctamente');
                const invalidInputs = document.querySelectorAll('.text-danger');
                invalidInputs.forEach((invalidInput) => {
                    invalidInput.remove();
                });
            } else {

                if (JSON.parse(data.errors.objetive).function) {
                    if (!document.getElementById('invalid-feedback-objetive')) {
                        msgObjetive = JSON.parse(data.errors.objetive).function[0].message;
                        const invalidFeedback = document.createElement('div');
                        const target = document.querySelector('#div_id_function');
                        invalidFeedback.setAttribute('id', 'invalid-feedback-objetive');
                        invalidFeedback.classList.add('text-danger');
                        invalidFeedback.innerHTML = msgObjetive;
                        target.appendChild(invalidFeedback);
                    }
                }
/*                 if (data.errors.constraints) {
                    var i = 0;
                    data.errors.constraints.forEach((constraint) => {
                        if(!document.getElementById(`invalid-feedback-constraint-${i}`)) {
                            if (JSON.parse(constraint).constraint) {
                                msg = JSON.parse(constraint).constraint[0].message;
                                const invalidFeedback = document.createElement('div');
                                const target = document.querySelector('#restriction-form-id');
                                invalidFeedback.setAttribute('id', `invalid-feedback-constraint-${i}`);
                                invalidFeedback.classList.add('text-danger');
                                invalidFeedback.innerHTML = msg;
                                target.append(invalidFeedback);
                                ++i;
                            }
                        }
                    });
                } */
                $('#errorModal').modal('show');

            }
        })
        .catch(function(error) {
            //$('#errorModal').modal('show');
            console.log('Hubo un problema con la petición Fetch:' + error);
        });
}
