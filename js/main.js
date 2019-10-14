'use strict';

// Записываем данные в переменные

var PHOTO_COUNT = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var MIN_COMMENT = 1;
var MAX_COMMENT = 2;
var MIN_AVATAR = 1;
var MAX_AVATAR = 6;

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

var bigPictureItem = document.querySelector('.big-picture');

// находим контейнер для вывода комментариев

var bigPictureCommentsList = bigPictureItem.querySelector('.social__comments');

// находим имя шаблона которым будем манипулировать для вывода комментраиев

var pictureCommentTemplate = bigPictureCommentsList.querySelector('.social__comment');

// функция удаления доп. класса для показа блока

var showElement = function (element, param) {
  var elementMain = document.querySelector(element);
  return elementMain.classList.remove(param);
};

showElement('.big-picture', 'hidden');

// функция добавления доп. класса для скрытия блока

var hideElement = function (element1, element2, param) {
  var elementMain1 = document.querySelector(element1);
  elementMain1.classList.add(param);
  var elementMain2 = document.querySelector(element2);
  elementMain2.classList.add(param);
};

// убираем из показа счетсик комментариев и показ новых комментариев по ТЗ

hideElement('.social__comment-count', '.comments-loader', 'visually-hidden');

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

    // добавляем значения в массив и объект

    var PictureArray = {url: url, likes: likes, comments: comments, description: description};
    pictureData.push(PictureArray);
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

// Вывод большой картинки module3-tsk3
// функция очистки старых комментариев

var clearBigPictureComments = function () {
  var comments = bigPictureCommentsList.children;
  for (var i = comments.length - 1; i >= 0; i--) {
    comments[i].parentElement.removeChild(comments[i]);
  }
};

// функция для записи в шаблон комментариев рандомных аватарок, имен и комментариев из массивов

var renderBigPictureComment = function (comments) {
  var commentElement = pictureCommentTemplate.cloneNode(true);

  commentElement.querySelector('.social__picture').src = 'img/avatar-' + getRandomNumber(MIN_AVATAR, MAX_AVATAR) + '.svg';
  commentElement.querySelector('.social__picture').alt = getRandomElement(NAMES);
  commentElement.querySelector('.social__text').textContent = comments;

  return commentElement;
};

var renderBigPictureComments = function (comments) {
  clearBigPictureComments();

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < comments.length; i++) {
    fragment.appendChild(renderBigPictureComment(comments[i]));
  }

  bigPictureCommentsList.appendChild(fragment);
};

// в функции находим блоки и записываем в них нужные данные для вывода в полноэкранном режиме

var renderBigPictureItem = function (picture) {

  bigPictureItem.querySelector('.big-picture__img').firstElementChild.src = picture.url;
  bigPictureItem.querySelector('.likes-count').textContent = picture.likes;
  bigPictureItem.querySelector('.comments-count').textContent = picture.comments.length;
  bigPictureItem.querySelector('.social__caption').textContent = picture.description;

  renderBigPictureComments(picture.comments);
};

// вызываем функцию рендеринга большого фото и рандомим фотографии в заданом промежутке из объекта

renderBigPictureItem(picturesData[getRandomNumber(0, PHOTO_COUNT)]);
