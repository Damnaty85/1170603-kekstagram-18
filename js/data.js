'use strict';

(function () {

  // Записываем данные в глобальные переменные сразу

  window.MAX_COMMENT = 2;
  window.ESC_KEYCODE = 27;
  window.MIN_SCALE = 25;
  window.MAX_SCALE = 100;
  window.SCALE_STEP = 25;

  window.MAX_SYMBOL_HASHTAG = 5;
  window.MAX_HASHTAG = 20;

  window.LENGTH_COMMENT = 140;

  window.URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  window.URL_UPLOAD = 'https://js.dump.academy/kekstagram';

  window.STATUS_OK = 200;
  window.TIME_OUT = 10000;

  window.RANDOM_PICTURE = 10;
  window.DEBOUNCE = 500;

  // добавление класса hidden к селектору

  var addHidden = function (selector) {
    selector.classList.add('hidden');
  };

  // удаление класса hidden у селектора

  var removeHidden = function (selector) {
    selector.classList.remove('hidden');
  };

  // функция добавления доп. класса для скрытия блока visually-hidden

  var hideElement = function (selector1, selector2, classElement) {
    var selectorMain1 = document.querySelector(selector1);
    selectorMain1.classList.add(classElement);
    var selectorMain2 = document.querySelector(selector2);
    selectorMain2.classList.add(classElement);
  };

  window.data = {
    addHidden: addHidden,
    removeHidden: removeHidden,
    hideElement: hideElement
  };
})();
