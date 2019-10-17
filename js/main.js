'use strict';

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

var bigPictureItem = document.querySelector('.big-picture');

// находим контейнер для вывода комментариев

var bigPictureCommentsList = bigPictureItem.querySelector('.social__comments');

// находим имя шаблона которым будем манипулировать для вывода комментраиев

var pictureCommentTemplate = bigPictureCommentsList.querySelector('.social__comment');

// функция удаления доп. класса для показа блока - временный коммент

// var removeClass = function (selector, classElement) {
//   var selectorMain = document.querySelector(selector);
//   return selectorMain.classList.remove(classElement);
// };

// временно исключаем из показа большое изображение - временный коммент

// removeClass('.big-picture', 'hidden');

// функция добавления доп. класса для скрытия блока

var hideElement = function (selector1, selector2, classElement) {
  var selectorMain1 = document.querySelector(selector1);
  selectorMain1.classList.add(classElement);
  var selectorMain2 = document.querySelector(selector2);
  selectorMain2.classList.add(classElement);
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

// module4-task2

var uploadFilePicture = document.querySelector('#upload-file');
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var uploadCancel = imgUploadOverlay.querySelector('#upload-cancel');

// добавление класса hidden у переменной

var addHidden = function (variable) {
  variable.classList.add('hidden');
};

// удаление класса hidden у переменной

var removeHidden = function (variable) {
  variable.classList.remove('hidden');
};

// Сбрасываем все стили ползунка и масштаба до первоначального состояния

var resetAllStyleEffect = function () {
  imgUploadPreview.style.transform = 'scale(1)';
  scaleControlValue.value = '100%';
  effectLevelValue.value = 100;
  effectLevelPin.style.left = '100%';
  effectLevelDepth.style.width = '100%';
};

// сбрасываем класс фильтр и значение загружаемой картинки

var resetLoadedPicture = function () {
  uploadFilePicture.value = '';
  imgUploadPreview.className = 'img-upload__preview';
  imgUploadPreview.style.filter = '';
};

// Функции и события открытия и закрытия окна загрузки и редактирования

var onImgUploadEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    addHidden(imgUploadOverlay);
    resetLoadedPicture();
  }
};

// именованная функция закрытия окна загрузки и редактирования файлов

var closeImgUpload = function () {
  addHidden(imgUploadOverlay);

  // сброс стиля эффектов и удаление класса эффекта при закрытии

  resetLoadedPicture();
  document.removeEventListener('keydown', onImgUploadEscPress);
};

// именованная функция открытия окна загрузки и редактирования файлов

var openImgUpload = function () {
  removeHidden(imgUploadOverlay);
  document.addEventListener('keydown', onImgUploadEscPress);

  // прячем плзунок при загрузке новой картинки

  addHidden(effectLevel);
  resetAllStyleEffect();

  // устанавливаем и снимаем фокус с поля описания для события запрета закрытия окна загрузки файла

  descriptionUploadFile.addEventListener('focus', function () {
    document.removeEventListener('keydown', onImgUploadEscPress);
  });
  descriptionUploadFile.addEventListener('blur', function () {
    document.addEventListener('keydown', onImgUploadEscPress);
  });

  // устанавливаем и снимаем фокус с поля хэштегов для события запрета закрытия окна загрузки файла

  hashtagUploadFile.addEventListener('focus', function () {
    document.removeEventListener('keydown', onImgUploadEscPress);
  });

  hashtagUploadFile.addEventListener('blur', function () {
    document.addEventListener('keydown', onImgUploadEscPress);
  });

  uploadCancel.addEventListener('click', function () {
    closeImgUpload();
  });
};

uploadFilePicture.addEventListener('change', function () {
  openImgUpload();
});

// все для блока эффектов

var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');
var effectLevel = imgUploadOverlay.querySelector('.effect-level');
var effectsRadio = imgUploadOverlay.querySelectorAll('.effects__radio');

// Функция добаления класса в соответствие с выбраным эффектом

var changeEffectsPreview = function (evt) {

  // находим класс у блока к которому будут добавлятся дополнительные классы приминяемых эффектов

  imgUploadPreview.className = 'img-upload__preview';

  // условие добавления класса

  if (evt.target.value !== 'none') {
    removeHidden(effectLevel);

    // находим общее у всех классов и будем добавляеть слово в зависимости от приминяемого эффекта

    imgUploadPreview.classList.add(
      'effects__preview--' + evt.target.value
    );
  }

  // прячем ползунок если не выбран никакой эффект и условия добавления стиля и класса выбранного эффекта

  switch (evt.target.value) {
    case 'none': imgUploadPreview.style.filter = '';
      addHidden(effectLevel);
      break;
    case 'chrome': imgUploadPreview.style.filter = 'grayscale(1)';
      break;
    case 'sepia': imgUploadPreview.style.filter = 'sepia(1)';
      break;
    case 'marvin': imgUploadPreview.style.filter = 'invert(100%)';
      break;
    case 'phobos': imgUploadPreview.style.filter = 'blur(3px)';
      break;
    case 'heat': imgUploadPreview.style.filter = 'brightness(3)';
      break;
  }
};

// обработчик события клика по эффектам со сбросом стилей

effectsRadio.forEach(function (item) {
  item.addEventListener('change', function (evt) {

    changeEffectsPreview(evt);
    resetAllStyleEffect();
  });
});

//  Перемещение ползунка и изминение интенсивности

var effectLevelValue = effectLevel.querySelector('.effect-level__value');
// var effectLevelLine = effectLevel.querySelector('.effect-level__line');
var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
var effectLevelDepth = effectLevel.querySelector('.effect-level__depth');

// Редактирование размера изображения
// Функция уменьшения изображения и изминение стиля

var scaleControlValue = imgUploadOverlay.querySelector('.scale__control--value');
var scaleControlMinus = imgUploadOverlay.querySelector('.scale__control--smaller');
var scaleControlPlus = imgUploadOverlay.querySelector('.scale__control--bigger');

var zoomOut = function () {
  var scaleSmaller = parseInt(scaleControlValue.value, 10) - SCALE_STEP;

  if (scaleSmaller <= MIN_SCALE) {
    scaleSmaller = MIN_SCALE;
  }
  scaleControlValue.value = scaleSmaller + '%';

  imgUploadPreview.style.transform = 'scale(' + scaleSmaller / 100 + ')';
};

// Функция увеличения изображенияи и изминение стиля

var zoomIn = function () {
  var scaleBigger = parseInt(scaleControlValue.value, 10) + SCALE_STEP;

  if (scaleBigger >= MAX_SCALE) {
    scaleBigger = MAX_SCALE;
  }
  scaleControlValue.value = scaleBigger + '%';

  imgUploadPreview.style.transform =
    'scale(' + scaleBigger / 100 + ')';
};

// Обработчик уменьшения изображения по клику на "-"

scaleControlMinus.addEventListener('click', function () {
  zoomOut();
});

// Обработчик увеличения изображения по клику на "+"

scaleControlPlus.addEventListener('click', function () {
  zoomIn();
});

// Валидация хэштегов и описания для фото

var hashtagUploadFile = document.querySelector('.text__hashtags');
var descriptionUploadFile = document.querySelector('.text__description');

var checkSimilarHashtags = function (hashtags) {
  for (var i = 0; i < hashtags.length; i++) {
    var currentHashtag = hashtags[i];
    for (var j = 0; j < hashtags.length; j++) {
      if (currentHashtag === hashtags[j] && i !== j) {
        return true;
      }
    }
  }
  return false;
};

var hashtagValidation = function () {
  var errorMessage = '';
  var hashtagValue = hashtagUploadFile.value.trim();

  if (hashtagValue === '') {
    hashtagUploadFile.setCustomValidity(errorMessage);
    return;
  }
  var hashtags = hashtagValue.toLowerCase().split(' ');
  hashtags.forEach(function (hashtagItem) {
    if (hashtagItem.charAt(0) !== '#') {
      errorMessage = 'Хэштег должен начинаться с символа #';
    } else if (hashtagItem.indexOf('#', 1) > 1) {
      errorMessage = 'Хэш-теги разделяются пробелами';
    } else if (hashtagItem.charAt(0) === '#' && hashtagItem.length === 1) {
      errorMessage = 'Хеш-тег не может состоять только из одной решётки';
    } else if (hashtags.length > 5) {
      errorMessage = 'Допустимое количество  хэштегов  не более 5';
    } else if (hashtagItem.length > 20) {
      errorMessage = 'Максимальная длина одного хэш-тега 20 символов, включая решётку';
    } else if (checkSimilarHashtags(hashtags)) {
      errorMessage = 'Хэштеги не должны повторяться';
    }
  });

  hashtagUploadFile.setCustomValidity(errorMessage);

};

hashtagUploadFile.addEventListener('input', hashtagValidation);
