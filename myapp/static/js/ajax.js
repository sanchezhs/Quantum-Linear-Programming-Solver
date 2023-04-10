var $ = jQuery.noConflict();
var form = document.getElementById('form');
var data = new FormData(form);
const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
$('#form').submit(function (e) {
    e.preventDefault();
    $.ajax({
        url: '',
        type: 'POST',
        data: data,
        processData: false,
        contentType: false,
        success: function (data) {
            console.log(data);
        },
        error: function (data) {
            console.log(data);
        }
    });
    return false;
});