'use strict';

(function () {

  var MAX_COMMENT = 5;

  var bigPictureItem = document.querySelector('.big-picture');
  var bigPictureCommentsList = bigPictureItem.querySelector('.social__comments');
  var pictureCommentTemplate = bigPictureCommentsList.querySelector('.social__comment');
  var buttonClose = bigPictureItem.querySelector('.big-picture__cancel');
  var bigPictureCounterComment = bigPictureItem.querySelector('.social__comment-count');
  var commentsLoadButton = bigPictureItem.querySelector('.social__comments-loader');

  var renderBigPictureOneComment = function (comments) {
    var commentElement = pictureCommentTemplate.cloneNode(true);

    commentElement.querySelector('.social__picture').src = comments.avatar;
    commentElement.querySelector('.social__picture').alt = comments.name;
    commentElement.querySelector('.social__text').textContent = comments.message;

    commentElement = commentElement.cloneNode(true);

    return commentElement;
  };

  // функция очистки старых комментариев

  var clearBigPictureComments = function () {
    var comments = bigPictureCommentsList.children;
    for (var i = comments.length - 1; i >= 0; i--) {
      comments[i].parentElement.removeChild(comments[i]);
    }
  };

  // много комментариев и счетчик этих самых комментариев

  var renderBigPictureComments = function (comments) {
    var fragment = document.createDocumentFragment();

    comments.forEach(function (item) {
      fragment.appendChild(renderBigPictureOneComment(item));
    });

    bigPictureCommentsList.appendChild(fragment);

    var countComments = bigPictureCommentsList.querySelectorAll('.social__comment').length;
    bigPictureCounterComment.firstChild.textContent = countComments + ' из ';
  };

  // показываем первые пять комментариев работа кнопки еще и показ следующих комментов

  var createComments = function (pictureData) {
    var commentsCloneArray = pictureData.comments.slice();

    clearBigPictureComments();

    var onCommentLoadClick = function () {
      var bigPictureCommentArray = commentsCloneArray.splice(0, MAX_COMMENT);

      if (commentsCloneArray.length === 0) {
        window.data.addHiddenClass('.social__comments-loader', 'visually-hidden');
      }
      renderBigPictureComments(bigPictureCommentArray);
    };
    onCommentLoadClick();

    commentsLoadButton.addEventListener('click', onCommentLoadClick);
  };


  // в функции находим блоки и записываем в них нужные данные для вывода в полноэкранном режиме

  var renderBigPictureItem = function (picture) {

    bigPictureItem.querySelector('.big-picture__img').firstElementChild.src = picture.url;
    bigPictureItem.querySelector('.likes-count').textContent = picture.likes;
    bigPictureItem.querySelector('.comments-count').textContent = picture.comments.length;
    bigPictureItem.querySelector('.social__caption').textContent = picture.description;

    // renderBigPictureComments(picture.comments);

    commentsLoadButton.classList.remove('visually-hidden');

    createComments(picture);
  };

  // функция которая открывает большую фотографию

  var openBigPicture = function () {
    window.data.removeHidden(bigPictureItem);
    document.addEventListener('keydown', window.form.onPressEscKey);
  };

  // функция которая закрывает большую фотографию

  var closeBigPicture = function () {
    window.data.addHidden(bigPictureItem);
    document.removeEventListener('keydown', window.form.onPressEscKey);
    document.querySelector('body').style = '';
  };

  // закрываем большую фотографию по крестику

  buttonClose.addEventListener('click', function () {
    closeBigPicture();
  });

  window.preview = {
    openBigPicture: openBigPicture,
    closeBigPicture: closeBigPicture,
    renderBigPictureItem: renderBigPictureItem
  };
})();
