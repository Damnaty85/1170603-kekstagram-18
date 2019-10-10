'use strict';

// Записываем данные в переменные

var PHOTO_COUNT = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var MIN_COMMENT = 1;
var MAX_COMMENT = 2;

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

// Функция вовращает рандомное число между минимальным(включительно) и максимальным(включительно)

var getRandomNumber = function (min, max) {
  return Math.round((Math.random() * (max - min)) + min);
};

//  Обращается к случайному элементу в массиве, генерируя случайное число с плавающей точкой от нуля до длины массива и округляя его до ближайшего целого числа

var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

// Функция возвращает случайные два коментария из массива

var generateUserComments = function (comments) {

  var userComments = [];
  var pictureQuantityComments = getRandomNumber(MIN_COMMENT, MAX_COMMENT);

  for (var i = 0; i < pictureQuantityComments; i++) {
    userComments.push(getRandomElement(comments));
  }
  return userComments;
};

// Функция создает объекты и записывает их в массив

var generatePicturesObject = function () {
  var pictureData = [];

  for (var i = 0; i < PHOTO_COUNT; i++) {
    var url = 'photos/' + (i + 1) + '.jpg';
    var likes = getRandomNumber(MIN_LIKES, MAX_LIKES);
    var comments = generateUserComments(COMMENTS);
    var description = getRandomElement(DESCRIPTIONS);

    pictureData.push({url, likes, comments, description});
  }
  return pictureData;
};

// Находим необходимые блоки и записываем в них данные

var renderUserPicture = function (picture) {

  // Находим template для вывода данныых

  var userPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var pictureElement = userPictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

  return pictureElement;
};

// Отрисовываем шаблон на странице

var renderUserPictures = function (pictures) {

  // контейнер дл вывода картинок

  var userPicturesItem = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pictures.length; i++) {
    fragment.appendChild(renderUserPicture(pictures[i]));
  }

  userPicturesItem.appendChild(fragment);
};

var picturesData = generatePicturesObject();
renderUserPictures(picturesData);
