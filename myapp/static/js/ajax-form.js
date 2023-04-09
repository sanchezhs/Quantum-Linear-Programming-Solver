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
            } else {
                
            }
        })
        .catch(function(error) {
            $('#errorModal').modal('show');
            console.log('Hubo un problema con la petición Fetch:' + error);
        });
}