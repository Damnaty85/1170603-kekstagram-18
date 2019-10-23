'use strict';

(function () {

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

    commentElement.querySelector('.social__picture').src = 'img/avatar-' + window.data.getRandomNumber(window.data.MIN_AVATAR, window.data.MAX_AVATAR) + '.svg';
    commentElement.querySelector('.social__picture').alt = window.data.getRandomElement(window.data.NAMES);
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

  var bigPictureItem = document.querySelector('.big-picture');
  var bigPictureCommentsList = bigPictureItem.querySelector('.social__comments');
  var pictureCommentTemplate = bigPictureCommentsList.querySelector('.social__comment');

  // убираем из показа счетсик комментариев и показ новых комментариев по ТЗ

  window.data.hideElement('.social__comment-count', '.comments-loader', 'visually-hidden');

  // функция которая открывает большую фотографию

  var openBigPicture = function () {
    window.data.removeHidden(bigPictureItem);
    document.addEventListener('keydown', window.form.onPictureUploadEscPress);
  };

  // функция которая закрывает большую фотографию

  var closeBigPicture = function () {
    window.data.addHidden(bigPictureItem);
    document.removeEventListener('keydown', window.form.onPictureUploadEscPress);
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

  renderBigPictureItem(window.picture.picturesData[window.data.getRandomNumber(0, window.data.PHOTO_COUNT)]);

  // закрываем большую фотографию

  var buttonClose = bigPictureItem.querySelector('.big-picture__cancel');
  buttonClose.tabIndex = 0;

  buttonClose.addEventListener('click', function () {
    closeBigPicture();
  });

  window.preview = {
    openBigPicture: openBigPicture,
    closeBigPicture: closeBigPicture,
    renderBigPictureItem: renderBigPictureItem
  };
})();
