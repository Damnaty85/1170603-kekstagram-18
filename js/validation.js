'use strict';

(function () {

  var MAX_SYMBOL_HASHTAG = 5;
  var MAX_HASHTAG = 20;
  var LENGTH_COMMENT = 140;

  var hashtagUploadFile = document.querySelector('.text__hashtags');
  var descriptionUploadFile = document.querySelector('.text__description');

  var checkSimilarHashtags = function (hashtags) {
    for (var i = 0; i < hashtags.length; i++) {
      var currentHashtag = hashtags[i];
      for (var j = 0; j < hashtags.length; j++) {
        if (currentHashtag === hashtags[j] && i !== j) {
          return true;
        }
      }
    }
    return false;
  };

  var onHashtagValidationCheck = function () {
    var errorMessage = '';
    var hashtagValue = hashtagUploadFile.value.trim();

    if (hashtagValue === '') {
      hashtagUploadFile.setCustomValidity(errorMessage);
      return;
    }
    var hashtags = hashtagValue.toLowerCase().split(' ');
    hashtags.forEach(function (hashtagItem) {
      if (hashtagItem.charAt(0) !== '#') {
        errorMessage = 'Хэш-тег должен начинаться с символа #';
      } else if (hashtagItem.indexOf('#', 1) > 1) {
        errorMessage = 'Хэш-теги разделяются пробелами';
      } else if (hashtagItem.charAt(0) === '#' && hashtagItem.length === 1) {
        errorMessage = 'Хеш-тег не может состоять только из одной решётки';
      } else if (hashtags.length > MAX_SYMBOL_HASHTAG) {
        errorMessage = 'Допустимое количество  хэш-тегов  не более ' + MAX_SYMBOL_HASHTAG + '.';
      } else if (hashtagItem.length > MAX_HASHTAG) {
        errorMessage = 'Максимальная длина одного хэш-тега ' + MAX_HASHTAG + ' символов, включая решётку';
      } else if (checkSimilarHashtags(hashtags)) {
        errorMessage = 'Хэштеги не должны повторяться';
      }
    });

    hashtagUploadFile.setCustomValidity(errorMessage);
  };

  // окрашивает окно в не валидный цвет при не верном заполнении

  hashtagUploadFile.addEventListener('input', function () {
    onHashtagValidationCheck();
    window.data.highlightedInputError(hashtagUploadFile);
  });

  // валидация описания к новой картинке

  descriptionUploadFile.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length > LENGTH_COMMENT) {
      target.setCustomValidity('Максимальная длина комментария ' + LENGTH_COMMENT + ' символов');
      window.data.highlightedInputError(target);
    } else {
      window.data.resetInputValidation(target);
    }
  });

  window.validation = {
    hashtagUploadFile: hashtagUploadFile,
    descriptionUploadFile: descriptionUploadFile
  };

})();
