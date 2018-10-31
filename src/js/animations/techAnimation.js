export default {
  techAnimate(element) {

    $(document).ready(function () {

      if($(window).scrollTop() >= $('#section2').offset().top) {

        (function add(i) {
          $('.tech__list li').eq(i).addClass("active");
          if (i < $('.tech__list li').length - 1) {
            setTimeout(function() { add(i + 1); }, 200);
          }
        })(0);

      } else {

        $(document).on('scroll', function() {
          if(element !== 'undefined') {
            if($('.tech__list').offset().top - 350 <= $(window).scrollTop() + window.innerHeight/3) {

              (function add(i) {
                $('.tech__list li').eq(i).addClass("active");
                if (i < $('.tech__list li').length - 1) {
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