'use strict';

(function () {

  var uploadFormPicture = document.querySelector('#upload-select-image');
  var uploadFilePicture = document.querySelector('#upload-file');
  var pictureUploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadCancel = pictureUploadOverlay.querySelector('#upload-cancel');

  var resetLoadedPicture = function () {

    // ресетим форму и сбрасываем класс фильтра
    uploadFormPicture.reset();
    window.effect.pictureUploadPreview.className = 'img-upload__preview';
    window.effect.pictureUploadPreview.style.filter = '';

    // сброс валидации полей
    window.data.resetInputValidation(window.validation.hashtagUploadFile);
    window.data.resetInputValidation(window.validation.descriptionUploadFile);

    // сброс эффектов и масштаба
    window.effect.resetAllStyleEffect();
  };

  // Функции и события открытия и закрытия окна загрузки и редактирования

  var onPressEscKey = function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      window.data.addHidden(pictureUploadOverlay);
      resetLoadedPicture();
    }
  };

  // именованная функция закрытия окна загрузки и редактирования файлов

  var closePictureUpload = function () {
    window.data.addHidden(pictureUploadOverlay);

    // сброс стиля эффектов и удаление класса эффекта при закрытии
    resetLoadedPicture();
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', onPressEscKey);
  };

  // именованная функция открытия окна загрузки и редактирования файлов

  var openPictureUpload = function () {
    window.data.removeHidden(pictureUploadOverlay);
    document.addEventListener('keydown', onPressEscKey);

    // прячем ползунок при загрузке новой картинки

    window.data.addHidden(window.effect.effectLevel);

    uploadCancel.addEventListener('click', function () {
      closePictureUpload();
    });

    // устанавливаем и снимаем фокус с поля описания для события запрета закрытия окна загрузки файла

    window.validation.descriptionUploadFile.addEventListener('focus', function () {
      document.removeEventListener('keydown', onPressEscKey);
    });

    window.validation.descriptionUploadFile.addEventListener('blur', function () {
      document.addEventListener('keydown', onPressEscKey);
    });

    // устанавливаем и снимаем фокус с поля хэштегов для события запрета закрытия окна загрузки файла

    window.validation.hashtagUploadFile.addEventListener('focus', function () {
      document.removeEventListener('keydown', onPressEscKey);
    });

    window.validation.hashtagUploadFile.addEventListener('blur', function () {
      document.addEventListener('keydown', onPressEscKey);
    });

    document.querySelector('body').classList.add('modal-open');
  };

  uploadFilePicture.addEventListener('change', function () {
    openPictureUpload();
  });

  // Отправка формы нажатием на кнопку

  uploadFormPicture.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.upload.uploadData(new FormData(uploadFormPicture), window.upload.onSucces);
  });

  window.form = {
    pictureUploadOverlay: pictureUploadOverlay,
    onPressEscKey: onPressEscKey,
    closePictureUpload: closePictureUpload,
    uploadFormPicture: uploadFormPicture,
    uploadFilePicture: uploadFilePicture
  };
})();

