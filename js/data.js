'use strict';

(function () {

  var ESC_KEYCODE = 27;

  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram';
  var STATUS_OK = 200;

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
    ESC_KEYCODE: ESC_KEYCODE,
    URL_LOAD: URL_LOAD,
    URL_UPLOAD: URL_UPLOAD,
    STATUS_OK: STATUS_OK,
    addHidden: addHidden,
    removeHidden: removeHidden,
    hideElement: hideElement
  };
})();
