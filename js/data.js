'use strict';

(function () {

// Записываем данные в переменные

  var PHOTO_COUNT = 25;
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;
  var MIN_COMMENT = 1;
  var MAX_COMMENT = 2;
  var MIN_AVATAR = 1;
  var MAX_AVATAR = 6;
  var ESC_KEYCODE = 27;
  var MIN_SCALE = 25;
  var MAX_SCALE = 100;
  var SCALE_STEP = 25;

  var COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var DESCRIPTIONS = [
    'Мы сделали это!',
    'Что вы об этом думаете?',
    'Работать. Копить. Путешествовать. Повторить.',
    'Нечего добавить',
    '*Добавить остроумную подпись*',
    'Да, еще одно фото'
  ];

// Добавляем имена коментаторов

  var NAMES = [
    'Даша',
    'Никита',
    'Антон',
    'Борис',
    'Ярис',
    'Даня'
  ];

// добавление класса hidden к селектору

  var addHidden = function (selector) {
    selector.classList.add('hidden');
  };

// удаление класса hidden у селектора

  var removeHidden = function (selector) {
    selector.classList.remove('hidden');
  };

// Функция вовращает рандомное число между минимальным(включительно) и максимальным(включительно)

  var getRandomNumber = function (min, max) {
    return Math.round((Math.random() * (max - min)) + min);
  };

//  Обращается к случайному элементу в массиве, генерируя случайное число с плавающей точкой от нуля до длины массива и округляя его до ближайшего целого числа

  var getRandomElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };


  // функция добавления доп. класса для скрытия блока visually-hidden

  var hideElement = function (selector1, selector2, classElement) {
    var selectorMain1 = document.querySelector(selector1);
    selectorMain1.classList.add(classElement);
    var selectorMain2 = document.querySelector(selector2);
    selectorMain2.classList.add(classElement);
  };

  window.data = {
    PHOTO_COUNT: PHOTO_COUNT,
    ESC_KEYCODE: ESC_KEYCODE,
    MIN_AVATAR: MIN_AVATAR,
    MAX_AVATAR: MAX_AVATAR,
    NAMES: NAMES,
    COMMENTS: COMMENTS,
    DESCRIPTIONS: DESCRIPTIONS,
    SCALE_STEP: SCALE_STEP,
    MIN_SCALE: MIN_SCALE,
    MAX_SCALE: MAX_SCALE,
    MIN_LIKES: MIN_LIKES,
    MAX_LIKES: MAX_LIKES,
    MIN_COMMENT: MIN_COMMENT,
    MAX_COMMENT: MAX_COMMENT,
    addHidden: addHidden,
    removeHidden: removeHidden,
    getRandomNumber: getRandomNumber,
    getRandomElement: getRandomElement,
    hideElement: hideElement
  }
})();
