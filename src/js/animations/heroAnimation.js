export default {
  heroNumberAnimate(element) {

    $(document).on('scroll', function () {

      if ($(window).scrollTop() <= 50) {

        $(element).addClass('activeSlide');

      } else {

        $(element).removeClass('activeSlide');
        $(element).removeClass('activeHeroSlide');

      }

    });

  }
}