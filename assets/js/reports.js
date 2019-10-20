$(document).ready(function () {

})

$('.expandMem').click(function () {
  $(this).toggleClass('rotateLeft');
  if ($(window).width() > 767) {
    $(this).parents('.row').next('.members-row').slideToggle(200);
  } else {
    $(this).parents('.row').next('.members-row').fadeToggle(100);
  }
})


$('.single-field').click(function () {
  if ($('.single-field.selected').length < 4) {
    $(this).toggleClass('selected');
  } else {
    $(this).removeClass('selected');
  }

});



function toggleSearch(el) {
  if ($(window).width() > 767) {
    $(el).slideToggle(200);
  } else {
    $(el).fadeToggle(150);
  }
}