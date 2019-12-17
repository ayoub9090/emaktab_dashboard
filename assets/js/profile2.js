$(document).ready(function () {
    setTimeout(function () {
        $('.progress-bar').each(function () {

            $(this).css('width', $(this).attr('aria-valuenow') + '%');
        })
    }, 1000);

});