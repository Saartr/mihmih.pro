import lang from './lang';
import animate from './animations/numberAnimation';
import heroAnimate from './animations/heroAnimation';
import scrollSpy from './scrollSpy';


$(document).ready(function () {

  lang.onSwitchLang();

  scrollSpy.scrollSpy();

  $('.hero .main__number').addClass('activeHeroSlide');

  heroAnimate.heroNumberAnimate('.hero .main__number');
  animate.numberAnimate('.skill .main__number');
  animate.numberAnimate('.tech .main__number');
  animate.numberAnimate('.experience .main__number');
  animate.numberAnimate('.education .main__number');
  animate.numberAnimate('.portfolio .main__number');
  animate.numberAnimate('.footer .main__number');

});