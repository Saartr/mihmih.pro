export default {
  scrollSpy() {

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.counter__item');

    function getClosestSection() {
      const sectionsLength = sections.length;

      for(var index=0; index<sectionsLength; index++) {
        if (isBelowScroll(sections.item(index)))
          break;
      }

      selectLink(sections.item(index).id)
    }

    function isBelowScroll(element) {
      let position = element.getBoundingClientRect();
      return position.top >= -150;
    }

    function selectLink(id) {

      Array.prototype.forEach.call(navLinks, function(element){
        element.classList.remove('is-selected');
      });

      $('.counter__item').eq(id.replace(/\D+/g,'') - 1).addClass('is-selected');

    }

    window.addEventListener('scroll', function(event) {
      getClosestSection();
    });

    $('.counter__item').on('click', function () {

      var clickedItem = $('.counter__item').index(this) + 1;

      $('html, body').animate({ scrollTop: $(`#section${clickedItem}`).offset().top}, 1000);
    });

    $('.main__number_topTop').on('click', function () {
      $('html, body').animate({ scrollTop: 0}, 1000);
    });

    $('.scroll-block').on('click', function () {
      $('html, body').animate({ scrollTop: $('#section1').outerHeight()}, 1000);
    });

  }
}