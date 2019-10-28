'use strict';

(function () {

  // Записываем данные в переменные

  var MAX_COMMENT = 2;
  var ESC_KEYCODE = 27;
  var MIN_SCALE = 25;
  var MAX_SCALE = 100;
  var SCALE_STEP = 25;

  // добавление класса hidden к селектору

  var addHidden = function (selector) {
    selector.classList.add('hidden');
  };

  // удаление класса hidden у селектора

  var removeHidden = function (selector) {
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

  var hideElement = function (selector1, selector2, classElement) {
    var selectorMain1 = document.querySelector(selector1);
    selectorMain1.classList.add(classElement);
    var selectorMain2 = document.querySelector(selector2);
    selectorMain2.classList.add(classElement);
  };

  window.data = {
    MAX_COMMENT: MAX_COMMENT,
    ESC_KEYCODE: ESC_KEYCODE,
    SCALE_STEP: SCALE_STEP,
    MIN_SCALE: MIN_SCALE,
    MAX_SCALE: MAX_SCALE,
    addHidden: addHidden,
    removeHidden: removeHidden,
    hideElement: hideElement
  };
})();
