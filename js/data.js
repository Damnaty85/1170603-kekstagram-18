'use strict';

(function () {

  var ESC_KEYCODE = 27;

  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram';
  var STATUS_OK = 200;

  // добавление класса hidden

  var addHidden = function (selector) {
    selector.classList.add('hidden');
  };

  // удаление класса hidden

  var removeHidden = function (selector) {
    selector.classList.remove('hidden');
  };

  // добаление и удаление класс элемента + класс модификатора

  var addHiddenClass = function (selector, classElement) {
    var element = document.querySelector(selector);
    return element.classList.add(classElement);
  };

  var removeHiddenClass = function (selector, classElement) {
    var element = document.querySelector(selector);
    return element.classList.remove(classElement);
  };

  // Функция подсветки поля в случае не валидации

  var highlightedInputError = function (selector) {
    selector.style.outline = !selector.validity.valid ? '2px solid red' : 'none';
  };

  // сброс валидации и удаление обводки при закрытии окна загрузки нового файла

  var resetInputValidation = function (selector) {
    selector.setCustomValidity('');
    selector.style.outline = 'none';
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
    highlightedInputError: highlightedInputError,
    resetInputValidation: resetInputValidation
  };
})();
