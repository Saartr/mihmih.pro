export default {
  onSwitchLang() {
    const langItem = $('.language__list');

    switch (location.pathname){

      case '/index.html':
        langItem.find("li:first-of-type a").addClass('activeLang');
        break;

      case '/en.html':
        langItem.find("li:last-of-type a").addClass('activeLang');
        break;

    }
  }
}