$(document).ready(function () {

})

$('.expandMem').click(function () {
  $(this).toggleClass('rotateLeft');
  $(this).parents('.row').next('.members-row').fadeToggle(100);
})


$('.single-field').click(function () {
  if ($('.single-field.selected').length < 4) {
    $(this).toggleClass('selected');
  } else {
    $(this).removeClass('selected');
  }

});



function toggleSearch(el) {
  $(el).fadeToggle(150);
}