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
        .then(function(response) {
            loadingIcon.classList.add('d-none');
            if (response.ok) {
                return response.json();
            } else {
                $('#errorModal').modal('show');
            }
        })
            
        .then(function(data) {
            console.log('datos ', data);
        })
        .catch(function(error) {
            console.log('Hubo un problema con la petición Fetch:' + error.message);
          });
}
