const form = document.querySelector('#form');
form.addEventListener('submit', sendForm);

function sendForm(event) {
    event.preventDefault();
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
            if (response.ok) {
                console.log(response);
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(function(data) {
            if (data && data.status === 'ok') {
                const constraintForms = document.querySelectorAll('.restriction-form');
                if (constraintForms) {
                    constraintForms.forEach(function (form) {
                        if (form.classList.contains('is-invalid')) {
                            form.classList.remove('is-invalid');                            
                            return;
                        }
                    });
                }
                alert('Mensaje enviado correctamente');
            } else {
                const invalidForm = document.getElementById(data.constraint_name);
                if (invalidForm)
                    invalidForm.classList.add('is-invalid');
                $('#errorModal').modal('show');
                //alert('Error al enviar el mensaje');
            }
        })
        //.catch(function(error) {
        //    console.error('Error parsing response as JSON:', error);
        //    alert('Error al enviar el mensaje');
        //});
}