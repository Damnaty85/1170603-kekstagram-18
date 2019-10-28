'use strict';

(function () {

  // Записываем данные в переменные

  window.MAX_COMMENT = 2;
  window.ESC_KEYCODE = 27;
  window.MIN_SCALE = 25;
  window.MAX_SCALE = 100;
  window.SCALE_STEP = 25;

  // добавление класса hidden к селектору

  window.addHidden = function (selector) {
    selector.classList.add('hidden');
  };

  // удаление класса hidden у селектора

  window.removeHidden = function (selector) {
    selector.classList.remove('hidden');
  };

  // Функция вовращает рандомное число между минимальным(включительно) и максимальным(включительно)

  // var getRandomNumber = function (min, max) {
  //   return Math.round((Math.random() * (max - min)) + min);
  // };

  //  Обращается к случайному элементу в массиве, генерируя случайное число с плавающей точкой от нуля до длины массива и округляя его до ближайшего целого числа

  // var getRandomElement = function (array) {
  //   return array[Math.floor(Math.random() * array.length)];
  // };

  // функция добавления доп. класса для скрытия блока visually-hidden

  window.hideElement = function (selector1, selector2, classElement) {
    var selectorMain1 = document.querySelector(selector1);
    selectorMain1.classList.add(classElement);
    var selectorMain2 = document.querySelector(selector2);
    selectorMain2.classList.add(classElement);
  };

  // Функции и события открытия и закрытия окна загрузки и редактирования

  window.onPressEscKey = function (evt) {
    if (evt.keyCode === window.ESC_KEYCODE) {
      addHidden(window.form.pictureUploadOverlay);
      resetLoadedPicture();
      inputResetUpload();
      window.closeBigPicture();
    }
  };
})();
