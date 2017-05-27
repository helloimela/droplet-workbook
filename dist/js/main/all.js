$(document).ready(function() {
  $('#fullpage').fullpage({
    anchors: ['intro', 'brainstorming', 'explore','experiment','final'],
    navigation: true,
    navigationPosition: 'right',
    slidesNavPosition: 'center',
    verticalCentered: false
  });

  $('.js-cp').click(function(e){
    e.preventDefault();
    var href = $(this).attr('href');
    $(href).addClass('active');
  });
  $('.js-intro').click(function(e){
    e.preventDefault();
    $('#introanim').toggleClass('active');
  });
  $('.wb-close').click(function(e){
    e.preventDefault();
    $(this).closest('.wb-modal').removeClass('active');
  });

  $('.to-sec-4').click(function(e){
    e.preventDefault();
    $('.sec-4').toggleClass('active');
  });
});