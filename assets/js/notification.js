
/********************Dashboard************************* */
$(document).ready(function () {

  $('.fa-unlock').on('click', function () {
    $(this).toggleClass('fa-lock').toggleClass('fa-unlock');
    $(this).parent('.btn').toggleClass('btn-active');
  });

  $('.fa-lock').on('click', function () {
    $(this).toggleClass('fa-lock').toggleClass('fa-unlock');
    $(this).parent('.btn').toggleClass('btn-active');
  });

})


function toggleTextarea(el) {
  $(el).slideToggle(200);
}

$(document).on('hidden.bs.modal', function (event) {
  if ($('.modal:visible').length) {
    $('body').addClass('modal-open');
  }
});
