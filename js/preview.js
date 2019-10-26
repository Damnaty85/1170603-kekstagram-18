'use strict';

(function () {

  var bigPictureItem = document.querySelector('.big-picture');
  var bigPictureCommentsList = bigPictureItem.querySelector('.social__comments');
  var pictureCommentTemplate = bigPictureCommentsList.querySelector('.social__comment');
  var buttonClose = bigPictureItem.querySelector('.big-picture__cancel');
  buttonClose.tabIndex = 0;

  // убираем из показа счетсик комментариев и показ новых комментариев по ТЗ

  window.data.hideElement('.social__comment-count', '.comments-loader', 'visually-hidden');

  // функция очистки старых комментариев

  var clearBigPictureComments = function () {
    var comments = bigPictureCommentsList.children;
    for (var i = comments.length - 1; i >= 0; i--) {
      comments[i].parentElement.removeChild(comments[i]);
    }
  };

  var renderBigPictureComment = function (comments) {
    var commentElement = pictureCommentTemplate.cloneNode(true);

    commentElement.querySelector('.social__picture').src = comments.avatar;
    commentElement.querySelector('.social__picture').alt = comments.name;
    commentElement.querySelector('.social__text').textContent = comments.message;

    return commentElement;
  };

  // функция для вывода максимального количества комментариев, пока два

  var renderBigPictureComments = function (comments) {
    clearBigPictureComments();

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.MAX_COMMENT; i++) {
      fragment.appendChild(renderBigPictureComment(comments[i]));
    }

    bigPictureCommentsList.appendChild(fragment);
  };

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

  // закрываем большую фотографию

  buttonClose.addEventListener('click', function () {
    closeBigPicture();
  });

  window.preview = {
    openBigPicture: openBigPicture,
    closeBigPicture: closeBigPicture,
    renderBigPictureItem: renderBigPictureItem
  };
})();
