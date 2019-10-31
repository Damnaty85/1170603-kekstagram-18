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

  var addHiddenClass = function (selector, classElement) {
    var element = document.querySelector(selector);
    return element.classList.add(classElement);
  };

  // удаление класса hidden у селектора

  var removeHidden = function (selector) {
    selector.classList.remove('hidden');
  };

  var removeHiddenClass = function (selector, classElement) {
    var element = document.querySelector(selector);
    return element.classList.remove(classElement);
  };

  // Функция подсветки поля в случае не валидации

  var errorInputOutline = function (selector) {
    selector.style = 'outline: 2px solid red';
  };

  window.data = {
    ESC_KEYCODE: ESC_KEYCODE,
    URL_LOAD: URL_LOAD,
    URL_UPLOAD: URL_UPLOAD,
    STATUS_OK: STATUS_OK,
    addHiddenClass: addHiddenClass,
    removeHiddenClass: removeHiddenClass,
    addHidden: addHidden,
    removeHidden: removeHidden,
    errorInputOutline: errorInputOutline
  };
})();
