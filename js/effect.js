'use strict';

(function () {
  var MIN_SCALE = 25;
  var MAX_SCALE = 100;
  var SCALE_STEP = 25;

  var mainSectionUpload = document.querySelector('.img-upload');
  var pictureUploadPreview = mainSectionUpload.querySelector('.img-upload__preview');
  var effectLevel = mainSectionUpload.querySelector('.effect-level');
  var effectsRadio = mainSectionUpload.querySelectorAll('.effects__radio');

  //  Перемещение ползунка и изминение интенсивности

  var effectLevelValue = effectLevel.querySelector('.effect-level__value');
  // иначе форма не отправляется и в консоли ошибка если поле не сделать readonly
  effectLevelValue.readOnly = 'true';
  var effectLevelLine = effectLevel.querySelector('.effect-level__line');
  var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
  var effectLevelDepth = effectLevel.querySelector('.effect-level__depth');

  // Редактирование размера изображения

  var scaleControlValue = mainSectionUpload.querySelector('.scale__control--value');
  var scaleControlMinus = mainSectionUpload.querySelector('.scale__control--smaller');
  var scaleControlPlus = mainSectionUpload.querySelector('.scale__control--bigger');

  // Сбрасываем все стили ползунка и масштаба до первоначального состояния

  var resetAllStyleEffect = function () {
    pictureUploadPreview.style.transform = 'scale(1)';
    scaleControlValue.value = '100%';
    effectLevelValue.value = 100;
    effectLevelPin.style.left = '100%';
    effectLevelDepth.style.width = '100%';
  };

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

  var zoomOut = function () {
    var scaleSmaller = parseInt(scaleControlValue.value, 10) - SCALE_STEP;

    if (scaleSmaller <= MIN_SCALE) {
      scaleSmaller = MIN_SCALE;
    }
    scaleControlValue.value = scaleSmaller + '%';

    pictureUploadPreview.style.transform = 'scale(' + scaleSmaller / 100 + ')';
  };

  // Функция увеличения изображенияи и изминение стиля

  var zoomIn = function () {
    var scaleBigger = parseInt(scaleControlValue.value, 10) + SCALE_STEP;

    if (scaleBigger >= MAX_SCALE) {
      scaleBigger = MAX_SCALE;
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

  var onValueEffectChange = function () {

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
    document.addEventListener('mousemove', onValueEffectChange);

    document.addEventListener('mouseup', onMouseUp);
  });

  window.effect = {
    resetAllStyleEffect: resetAllStyleEffect,
    pictureUploadPreview: pictureUploadPreview,
    effectLevel: effectLevel
  };
})();
