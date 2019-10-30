'use strict';

(function () {

  var mainElement = document.querySelector('main');

  // Отправляет форму

  var uploadData = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onSuccess();
      } else {
        onError();
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };

  // Создает попапчик окно из шаблона

  var openDialog = function (dialogSelector) {
    var successTemplate = document
      .querySelector('#' + dialogSelector)
      .content.querySelector('.' + dialogSelector);
    var successTemplateClone = successTemplate.cloneNode(true);

    mainElement.appendChild(successTemplateClone);
  };

  var closeDialog = function (dialogSelector) {
    var dialogElement = mainElement.querySelector('.' + dialogSelector);
    var dialogButtonElements = dialogElement.querySelectorAll('.' + dialogSelector + '__button');

    // Скрывает попап, удаляет обработчик ESC

    var dialogElementRemove = function () {
      dialogElement.remove();
      document.removeEventListener('keydown', onElementEscPress);
    };

    // Обработчик клавиши ESC
    var onElementEscPress = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        dialogElementRemove();
      }
    };

    // Проверяет есть ли клик на попап

    var dialogRemove = function (evt) {
      if (!evt.target.closest('.' + dialogSelector + '__inner')) {
        dialogElementRemove();
      }
    };

    // Закрывает нажатием на ESC

    document.addEventListener('keydown', onElementEscPress);
    // Закрывает по клику на произвольную область экрана
    dialogElement.addEventListener('click', dialogRemove);
    // Закрывает по клику на buttons
    dialogButtonElements.forEach(function (item) {
      item.addEventListener('click', dialogElementRemove);
    });
  };

  // Действия при успешной отправке на сервер

  var onSucces = function () {
    window.form.closePictureUpload();
    window.form.uploadFormPicture.reset();
    openDialog('success');
    closeDialog('success');
  };

  // Действия при ошибке при отправке на сервер

  var onError = function () {
    window.form.closePictureUpload();
    window.form.uploadFormPicture.reset();
    openDialog('error');
    closeDialog('error');
  };

  window.upload = {
    uploadData: uploadData,
    onSucces: onSucces
  };
})();
