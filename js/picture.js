'use strict';

(function () {

  // Находим необходимые блоки и записываем в них данные

  var renderUserPicture = function (picture) {

    // Находим заготовленный template для вывода данныых

    var userPictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');
    userPictureTemplate.tabIndex = 2;

    var pictureElement = userPictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    // открытие маленькое картинки

    pictureElement.addEventListener('click', function () {
      window.preview.openBigPicture();
      window.preview.renderBigPictureItem(picture);
      document.querySelector('body').classList.add('modal-open');
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

  window.load.loadData(window.data.URL_LOAD, renderUserPictures);

  window.picture = {
    renderUserPictures: renderUserPictures
  };
})();
