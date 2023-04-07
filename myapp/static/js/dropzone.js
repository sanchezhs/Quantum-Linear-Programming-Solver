Dropzone.options.dropZone = {
    dictDefaultMessage:  "Drop a file here to upload",
    dictMaxFilesExceeded: "You can not upload more than one file",
    addRemoveLinks: true,
    dictRemoveFile: "Delete",
    paramName: "file", // The name that will be used to transfer the file
    maxFilesize: 3, // MB
    acceptedFiles: 'text/plain',
    dictInvalidFileType: 'Only .txt files are allowed',
    uploadMultiple: false,
    maxFiles: 1,

    init: function() {
        this.on('maxfilesexceeded', file => {
           alert('You can upload only one file.');
           this.removeFile(file);
        })
        this.on('error', file => {
           // $('#errorModal').modal('show');
           // this.removeFile(file);
        })
        this.on("success", function(file, responseText) {
            if (responseText['status'] === 'error') {
                $('#errorModal').modal('show');
                this.removeAllFiles();
            }
        });
    }

// init: function() {
//     this.on("processing", file => {
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
// 
//     }
// )}

};
