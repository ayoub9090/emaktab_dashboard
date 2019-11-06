
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
