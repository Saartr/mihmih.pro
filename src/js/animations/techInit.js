export default {
  initList() {
    const unSort = ['Photoshop', 'Illustrator', 'InDesign', 'After Effect', 'XD', 'Abstract', 'Skecth', 'InVision', 'HTML', 'CSS', 'CoffeScript', 'Axure', 'Principle', 'Figma', 'Paper'];
    const sort = ['Photoshop', 'Illustrator', 'InDesign', 'After Effect', 'XD', 'Abstract', 'Skecth', 'InVision', 'HTML', 'CSS', 'CoffeScript', 'Axure', 'Principle', 'Figma', 'Paper'].sort();
    var listTimeout;

    sort.forEach((item) => {
      let li = document.createElement('li');
      $('.tech__list').append(li);

      li.innerHTML += item;
    });


    function sortList(list) {
      $('.tech__list li').removeClass('active');
      clearTimeout(listTimeout);

      setTimeout(() => {
        $('.tech__list li').remove();

        list.forEach((item) => {
          let li = document.createElement('li');
          $('.tech__list').append(li);

          li.innerHTML += item;
        });

        (function add(i) {
          $('.tech__list li').eq(i).addClass("active");
          if (i < $('.tech__list li').length - 1) {
            listTimeout = setTimeout(function() { add(i + 1); }, 200);
          }
        })(0);

      }, 800);
    }

    function doSort() {
      const list = $('.tech__link').hasClass('active') ? unSort : sort;

      sortList(list);
    }

    $('.tech__link').on('click', function() {
      $(this).toggleClass('active');
      doSort();
    });

  }
}