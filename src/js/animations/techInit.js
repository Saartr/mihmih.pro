export default {
  initList() {
    const unSort = ['Photoshop', 'Illustrator', 'InDesign', 'After Effect', 'XD', 'Abstract', 'Skecth', 'InVision', 'HTML', 'CSS', 'CoffeScript', 'Axure', 'Principle', 'Figma', 'Paper'];
    const sort = ['Photoshop', 'Illustrator', 'InDesign', 'After Effect', 'XD', 'Abstract', 'Skecth', 'InVision', 'HTML', 'CSS', 'CoffeScript', 'Axure', 'Principle', 'Figma', 'Paper'].sort();



    sort.forEach((item) => {
      let li = document.createElement('li');
      $('.tech__list').append(li);

      li.innerHTML += item;
    });

    function onSort() {
      $('.tech__list li').addClass('deactive');

      setTimeout(() => {
        $('.tech__list li').remove();

        unSort.forEach((item) => {
          let li = document.createElement('li');
          $('.tech__list').append(li);

          li.innerHTML += item;
        });

        (function add(i) {
          $('.tech__list li').eq(i).addClass("active");
          if (i < $('.tech__list li').length - 1) {
            setTimeout(function() { add(i + 1); }, 200);
          }
        })(0);

      }, 800);

      $('.tech__link').one('click', onUnsort);
    }

    function onUnsort() {
      $('.tech__list li').addClass('deactive');

      setTimeout(() => {
        $('.tech__list li').remove();

        sort.forEach((item) => {
          let li = document.createElement('li');
          $('.tech__list').append(li);

          li.innerHTML += item;
        });

        (function add(i) {
          $('.tech__list li').eq(i).addClass("active");
          if (i < $('.tech__list li').length - 1) {
            setTimeout(function() { add(i + 1); }, 200);
          }
        })(0);

      }, 800);

      $('.tech__link').one('click', onSort);
    }

    $('.tech__link').one('click', onSort);

  }
}