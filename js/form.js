'use strict';

(function () {

  var uploadFormPicture = document.getElementById('upload-select-image');
  var uploadFilePicture = document.getElementById('upload-file');
  var pictureUploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadCancel = pictureUploadOverlay.querySelector('#upload-cancel');

  // сбрасываем класс фильтр и значение загружаемой картинки

  var resetLoadedPicture = function () {
    uploadFormPicture.reset();
    window.effect.pictureUploadPreview.className = 'img-upload__preview';
    window.effect.pictureUploadPreview.style.filter = '';
  };

  // Функции и события открытия и закрытия окна загрузки и редактирования

  var onPressEscKey = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.data.addHidden(pictureUploadOverlay);
      resetLoadedPicture();
      inputResetUpload();
      window.preview.closeBigPicture();
    }
  };

  // функция сброса полей хэштег и описания (удаление текста из полей)

  var inputResetUpload = function () {
    window.validation.hashtagUploadFile.value = '';
    window.validation.descriptionUploadFile.value = '';
  };

  // именованная функция закрытия окна загрузки и редактирования файлов

  var closePictureUpload = function () {
    window.data.addHidden(pictureUploadOverlay);

    // сброс стиля эффектов и удаление класса эффекта при закрытии

    resetLoadedPicture();
    document.removeEventListener('keydown', onPressEscKey);
  };

  // именованная функция открытия окна загрузки и редактирования файлов

  var openPictureUpload = function () {
    window.data.removeHidden(pictureUploadOverlay);
    document.addEventListener('keydown', onPressEscKey);

    // прячем ползунок при загрузке новой картинки

    window.data.addHidden(window.effect.effectLevel);
    window.effect.resetAllStyleEffect();

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
    uploadFormPicture: uploadFormPicture,
    pictureUploadOverlay: pictureUploadOverlay,
    onPressEscKey: onPressEscKey,
    inputResetUpload: inputResetUpload,
    closePictureUpload: closePictureUpload
  };
})();

