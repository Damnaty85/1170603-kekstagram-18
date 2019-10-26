'use strict';

(function () {
  // Функция возвращает случайные два коментария из массива

  // var generateUserComments = function (comments) {
  //
  //   var userComments = [];
  //   var pictureQuantityComments = window.data.getRandomNumber(window.data.MIN_COMMENT, window.data.MAX_COMMENT);
  //
  //   for (var i = 0; i < pictureQuantityComments; i++) {
  //     userComments.push(window.data.getRandomElement(comments));
  //   }
  //   return userComments;
  // };

  // Функция создает объекты и записывает их в массив

  // var generatePicturesObject = function () {
  //   var pictureData = [];
  //
  //   for (var i = 0; i < URL; i++) {
  //     var url = 'photos/' + (i + 1) + '.jpg';
  //     var likes = window.data.getRandomNumber(window.data.MIN_LIKES, window.data.MAX_LIKES);
  //     var comments = generateUserComments(window.data.COMMENTS);
  //     var description = window.data.getRandomElement(window.data.DESCRIPTIONS);
  //
  //     добавляем значения в массив и объект
      //
      // var PictureArray = {url: url, likes: likes, comments: comments, description: description};
      // pictureData.push(PictureArray);
    // }
    // return pictureData;
  // };

  // Находим необходимые блоки и записываем в них данные

  var renderUserPicture = function (picture) {

    // Находим заготовленный template для вывода данныых

    var userPictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');

    userPictureTemplate.tabIndex = 1;
    var pictureElement = userPictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    // открытие маленькое картинки

    pictureElement.addEventListener('click', function () {
      window.preview.openBigPicture();
      window.preview.renderBigPictureItem(picture);
    });

    return pictureElement;
  };

  // Отрисовываем шаблон на странице

  var renderUserPictures = function (pictures) {
    var userPicturesItem = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pictures.length; i++) {
      fragment.appendChild(renderUserPicture(pictures[i]));
    }

    userPicturesItem.appendChild(fragment);
  };

  // var picturesData = generatePicturesObject();
  // renderUserPictures(picturesData);
  window.load.loadData(window.load.URL_DATA, renderUserPictures);

  // window.picture = {
  //   picturesData: picturesData,
  //   generatePicturesObject: generatePicturesObject
  // };
})();
