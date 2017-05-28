$(document).ready(function() {
  $('#fullpage').fullpage({
    anchors: ['intro', 'brainstorming', 'explore','experiment','final','cheers'],
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

  var slideWidth = $('.wb-slide').width();
  $('.wb-modal .wb-slide ul li').css({ width: slideWidth});

  function moveLeft() {
      $('.wb-slide ul').animate({
          left: + slideWidth
      }, 200, function () {
          $('.wb-slide ul li:last-child').prependTo('.wb-slide ul');
          $('.wb-slide ul').css('left', '');
      });
  };

  function moveRight() {
      $('.wb-slide ul').animate({
          left: - slideWidth
      }, 200, function () {
          $('.wb-slide ul li:first-child').appendTo('.wb-slide ul');
          $('.wb-slide ul').css('left', '');
      });
  };

  $('a.control-prev').click(function () {
      moveLeft();
  });

  $('a.control-next').click(function () {
      moveRight();
  });

});