'use strict';

(function () {
  // module4-task2

  var uploadFilePicture = document.querySelector('#upload-file');
  var pictureUploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadCancel = pictureUploadOverlay.querySelector('#upload-cancel');

// Сбрасываем все стили ползунка и масштаба до первоначального состояния

  var resetAllStyleEffect = function () {
    pictureUploadPreview.style.transform = 'scale(1)';
    scaleControlValue.value = '100%';
    effectLevelValue.value = 100;
    effectLevelPin.style.left = '100%';
    effectLevelDepth.style.width = '100%';
  };

// сбрасываем класс фильтр и значение загружаемой картинки

  var resetLoadedPicture = function () {
    uploadFilePicture.value = '';
    pictureUploadPreview.className = 'img-upload__preview';
    pictureUploadPreview.style.filter = '';
  };

// Функции и события открытия и закрытия окна загрузки и редактирования

  var onPictureUploadEscPress = function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      window.data.addHidden(pictureUploadOverlay);
      resetLoadedPicture();
      window.preview.closeBigPicture();
      inputResetUpload();
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
    document.removeEventListener('keydown', onPictureUploadEscPress);
  };

// именованная функция открытия окна загрузки и редактирования файлов

  var openPictureUpload = function () {
    window.data.removeHidden(pictureUploadOverlay);
    document.addEventListener('keydown', onPictureUploadEscPress);

    // прячем ползунок при загрузке новой картинки

    window.data.addHidden(effectLevel);
    resetAllStyleEffect();

    uploadCancel.addEventListener('click', function () {
      closePictureUpload();
    });

    // устанавливаем и снимаем фокус с поля описания для события запрета закрытия окна загрузки файла

    window.validation.descriptionUploadFile.addEventListener('focus', function () {
      document.removeEventListener('keydown', onPictureUploadEscPress);
    });

    window.validation.descriptionUploadFile.addEventListener('blur', function () {
      document.addEventListener('keydown', onPictureUploadEscPress);
    });

    // устанавливаем и снимаем фокус с поля хэштегов для события запрета закрытия окна загрузки файла

    window.validation.hashtagUploadFile.addEventListener('focus', function () {
      document.removeEventListener('keydown', onPictureUploadEscPress);
    });

    window.validation.hashtagUploadFile.addEventListener('blur', function () {
      document.addEventListener('keydown', onPictureUploadEscPress);
    });
  };

  uploadFilePicture.addEventListener('change', function () {
    openPictureUpload();
  });

  var pictureUploadPreview = pictureUploadOverlay.querySelector('.img-upload__preview');
  var effectLevel = pictureUploadOverlay.querySelector('.effect-level');
  var effectsRadio = pictureUploadOverlay.querySelectorAll('.effects__radio');

// Функция добаления класса в соответствие с выбраным эффектом

  var changeEffectsPreview = function (evt) {

    // находим класс у блока к которому будут добавлятся дополнительные классы приминяемых эффектов

    pictureUploadPreview.className = 'img-upload__preview';

    // условие добавления класса

    if (evt.target.value !== 'none') {
      window.data.removeHidden(effectLevel);

      // находим общее у всех классов и будем добавляеть слово в зависимости от приминяемого эффекта

      pictureUploadPreview.classList.add('effects__preview--' + evt.target.value);
    }

    // прячем ползунок если не выбран никакой эффект и условия добавления стиля и класса выбранного эффекта

    switch (evt.target.value) {
      case 'none': pictureUploadPreview.style.filter = '';
        window.data.addHidden(effectLevel);
        break;
      case 'chrome': pictureUploadPreview.style.filter = 'grayscale(1)';
        break;
      case 'sepia': pictureUploadPreview.style.filter = 'sepia(1)';
        break;
      case 'marvin': pictureUploadPreview.style.filter = 'invert(100%)';
        break;
      case 'phobos': pictureUploadPreview.style.filter = 'blur(3px)';
        break;
      case 'heat': pictureUploadPreview.style.filter = 'brightness(3)';
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

  var scaleControlValue = pictureUploadOverlay.querySelector('.scale__control--value');
  var scaleControlMinus = pictureUploadOverlay.querySelector('.scale__control--smaller');
  var scaleControlPlus = pictureUploadOverlay.querySelector('.scale__control--bigger');

  var zoomOut = function () {
    var scaleSmaller = parseInt(scaleControlValue.value, 10) - window.data.SCALE_STEP;

    if (scaleSmaller <= window.data.MIN_SCALE) {
      scaleSmaller = window.data.MIN_SCALE;
    }
    scaleControlValue.value = scaleSmaller + '%';

    pictureUploadPreview.style.transform = 'scale(' + scaleSmaller / 100 + ')';
  };

// Функция увеличения изображенияи и изминение стиля

  var zoomIn = function () {
    var scaleBigger = parseInt(scaleControlValue.value, 10) + window.data.SCALE_STEP;

    if (scaleBigger >= window.data.MAX_SCALE) {
      scaleBigger = window.data.MAX_SCALE;
    }
    scaleControlValue.value = scaleBigger + '%';

    pictureUploadPreview.style.transform = 'scale(' + scaleBigger / 100 + ')';
  };

// Обработчик уменьшения изображения по клику на "-"

  scaleControlMinus.addEventListener('click', function () {
    zoomOut();
  });

// Обработчик увеличения изображения по клику на "+"

  scaleControlPlus.addEventListener('click', function () {
    zoomIn();
  });

  window.form = {
    onPictureUploadEscPress: onPictureUploadEscPress
  }
})();

