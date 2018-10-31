export default {
  skillsAnimate(element) {

    $(document).on('scroll', function() {
      if(element !== 'undefined') {
        if($('.skill__row').offset().top - 350 <= $(window).scrollTop() + window.innerHeight/3) {

          (function add(i) {
            $('.skill__top').eq(i).addClass("active");
            if (i < $('.skill__top').length - 1) {
              setTimeout(function() { add(i + 1); }, 350);
            }
          })(0);

        }
      }
    });

  }
}