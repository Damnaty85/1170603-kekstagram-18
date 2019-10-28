'use strict';

(function () {
  // загрузка на сервер начало

  var URL_UPLOAD = 'https://js.dump.academy/kekstagram';
  var mainElement = document.querySelector('main');

  var uploadFormPicture = document.getElementById('upload-select-image');
  var uploadFilePicture = document.getElementById('upload-file');
  var pictureUploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadCancel = pictureUploadOverlay.querySelector('#upload-cancel');

  // Отправляет форму и проверяет ответ сервера
  var upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
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

  // Создает диалоговое окно из шаблонов и вставляет в документ (показывает)
  var openDialog = function (dialogSelector) {
    var successTemplate = document
      .querySelector('#' + dialogSelector)
      .content.querySelector('.' + dialogSelector);
    var successTemplateClone = successTemplate.cloneNode(true);

    mainElement.appendChild(successTemplateClone);
  };

  var closeDialog = function (dialogSelector) {
    var dialogElement = mainElement.querySelector('.' + dialogSelector);
    var dialogButtonElements = dialogElement.querySelectorAll(
      '.' + dialogSelector + '__button'
    );

    // Скрывает (удаляет) диалоговое окно непосредственно, удаляет обработчик ESC
    var dialogElementRemove = function () {
      dialogElement.remove();
      document.removeEventListener('keydown', onElementEscPress);
    };

    // Обработчик клавиши ESC
    var onElementEscPress = function (evt) {
      if (evt.keyCode === window.data.ESC_KEYCODE) {
        dialogElementRemove();
      }
    };

    // Проверяет если щелчек не по диалговому окну то закрывает его
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
    closePictureUpload();
    uploadFormPicture.reset();
    openDialog('success');
    closeDialog('success');
  };

  // Действия при ошибке при отправке на сервер
  var onError = function () {
    closePictureUpload();
    uploadFormPicture.reset();
    openDialog('error');
    closeDialog('error');
  };

  // загрузка на сервер конец

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
    uploadFormPicture.reset();
    pictureUploadPreview.className = 'img-upload__preview';
    pictureUploadPreview.style.filter = '';
  };

  // Функции и события открытия и закрытия окна загрузки и редактирования

  var onPressEscKey = function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
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

    window.data.addHidden(effectLevel);
    resetAllStyleEffect();

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
  var effectLevelLine = effectLevel.querySelector('.effect-level__line');
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

  // функция определяет класс в массиве и в соответствие с этим использует правильный стиль фильтра и расчет

  var changeEffectValue = function () {

    // перевод координат из абсолютных значений в относительные

    effectLevelValue.value = effectLevelPin.offsetLeft / effectLevelLine.clientWidth * 100;

    // проверяем второй элемент в масиве классов на соответсвие и назначаем соответствующий css фильтр

    switch (pictureUploadPreview.classList[1]) {
      case 'effects__preview--chrome': pictureUploadPreview.style.filter = 'grayscale(' + effectLevelValue.value / 100 + ')';
        break;
      case 'effects__preview--sepia': pictureUploadPreview.style.filter = 'sepia(' + effectLevelValue.value / 100 + ')';
        break;
      case 'effects__preview--marvin': pictureUploadPreview.style.filter = 'invert(' + effectLevelValue.value + '%)';
        break;
      case 'effects__preview--phobos': pictureUploadPreview.style.filter = 'blur(' + (effectLevelValue.value / 100) * 3 + 'px)';
        break;
      case 'effects__preview--heat': pictureUploadPreview.style.filter = 'brightness(' + (effectLevelValue.value / 100) * 3 + ')';
        break;
    }
  };

  // Перетаскивание слайдера эффектов

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoordsX = evt.clientX;

    var onMouseMove = function (moveEvt) {

      var moveX = startCoordsX - moveEvt.clientX;
      startCoordsX = moveEvt.clientX;

      var pinElementLeft = effectLevelPin.offsetLeft - moveX;

      var lineElementLeft = effectLevelLine.getBoundingClientRect().left;
      var lineElementRight = effectLevelLine.getBoundingClientRect().right;

      if (startCoordsX <= lineElementLeft) {
        pinElementLeft = 0;
      } else if (startCoordsX >= lineElementRight) {
        pinElementLeft = effectLevelLine.clientWidth;
      }

      effectLevelPin.style.left = pinElementLeft + 'px';
      effectLevelDepth.style.width = pinElementLeft + 'px';
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousemove', changeEffectValue);

    document.addEventListener('mouseup', onMouseUp);
  });

  // Отправка формы нажатием на кнопку
  uploadFormPicture.addEventListener('submit', function (evt) {
    evt.preventDefault();
    upload(new FormData(uploadFormPicture), onSucces);
  });

  window.form = {
    onPressEscKey: onPressEscKey
  };
})();

