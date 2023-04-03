Dropzone.options.dropZone = { // camelized version of the `id`
    paramName: "file", // The name that will be used to transfer the file
    maxFilesize: 3, // MB
    acceptedFiles: 'text/plain',
    dictInvalidFileType: 'Only .txt files are allowed',
    uploadMultiple: false,
    maxFiles: 1,
    }

// Dropzone.options.dropZone = {
// 
// init: function() {
//     this.on("addedfile", file => {
//         
//             const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
//             const request = new Request(
//                 //"{% url 'upload' %}",
//                 'upload/',
//                 {
//                     method: 'POST',
//                     headers: {'X-CSRFToken': csrfToken},
//                     mode: 'same-origin',
//                     body: file,
//                 }
//             );
// 
//             fetch(request)
//                 .then((response) => {
//                     if (response.ok) {
//                         return response.json();
//                     }
//                     throw new Error('Network response was not ok.');
//                 })
//                 .then(function(data) {
//                     console.log(data)
//                     if (data.status === 'ok') {
//                         alert('Mensaje enviado correctamente');
//                     } else {
//                         alert('Error al enviar el mensaje');
//                     }
//                 
//                 
//              });
//     this.on("maxfilesexceeded", function(file) {
//         console.log('max');
//     });
//     }
// )}};
