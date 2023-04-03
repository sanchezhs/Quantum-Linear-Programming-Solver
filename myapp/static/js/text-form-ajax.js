const form = document.querySelector('#form');
const btn = document.querySelector('#submit-func');
form.addEventListener('submit', sendForm);

function sendForm(event) {
    event.preventDefault();
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const request = new Request(
        //"{% url 'upload' %}",
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
            console.log('data', data)
            if (data.status === 'ok') {
                alert('Mensaje enviado correctamente');
            } else {
                alert('Error al enviar el mensaje');
            }
        })
        //.catch(function(error) {
        //    console.error('Error parsing response as JSON:', error);
        //    alert('Error al enviar el mensaje');
        //});
}