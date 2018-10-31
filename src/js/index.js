import lang from './lang';
import animate from './animations/numberAnimation';
import heroAnimate from './animations/heroAnimation';
import skillsAnimate from './animations/skillsAnimation';
import experienceAnimate from './animations/experienceAnimation';
import techInit from './animations/techInit';
import techAnimate from './animations/techAnimation';
import scrollSpy from './scrollSpy';


$(document).ready(function () {

  lang.onSwitchLang();

  scrollSpy.scrollSpy();

  $('.counter__item').eq(0).addClass('is-selected');

  skillsAnimate.skillsAnimate();

  heroAnimate.heroNumberAnimate('.hero .main__number');
  animate.numberAnimate('.skill .main__number');
  animate.numberAnimate('.tech .main__number');
  animate.numberAnimate('.experience .main__number');
  animate.numberAnimate('.education .main__number');
  animate.numberAnimate('.portfolio .main__number');
  animate.numberAnimate('.footer .main__number');
  skillsAnimate.skillsAnimate('.skill__top');
  experienceAnimate.experienceAnimate();
  techInit.initList();
  techAnimate.techAnimate();

  setTimeout(() => {
    $('.hero .main__number').addClass('activeHeroSlide');
  }, 2000);

});