export default {
  numberAnimate(element) {

    $(element).addClass('activeSlide');

    $(document).on('scroll', function() {

      if(($(element).offset().top - 350 <= $(window).scrollTop())
        && ($(window).scrollTop() <= $(element).offset().top + 150)) {

        $(element).addClass('activeSlide');

      } else {

        $(element).removeClass('activeSlide');

      }
    });

  }
}