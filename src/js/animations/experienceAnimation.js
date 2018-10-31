export default {
  experienceAnimate(element) {

    $(document).ready(function () {

      if($(window).scrollTop() >= $('#section4').offset().top) {

        (function add(i) {
          $('.experience__data').eq(i).addClass("active");
          if (i < $('.experience__data').length - 1) {
            setTimeout(function() { add(i + 1); }, 200);
          }
        })(0);


      } else {

        $(document).on('scroll', function() {
          if(element !== 'undefined') {
            if($('.experience__data').offset().top - 350 <= $(window).scrollTop() + window.innerHeight/3) {

              (function add(i) {
                $('.experience__data').eq(i).addClass("active");
                if (i < $('.experience__data').length - 1) {
                  setTimeout(function() { add(i + 1); }, 200);
                }
              })(0);

            }
          }
        });

      }

    });

  }
}