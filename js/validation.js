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

  var hashtagValidation = function () {
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
        window.data.errorInputOutline(hashtagUploadFile);
      } else if (hashtagItem.indexOf('#', 1) > 1) {
        errorMessage = 'Хэш-теги разделяются пробелами';
        window.data.errorInputOutline(hashtagUploadFile);
      } else if (hashtagItem.charAt(0) === '#' && hashtagItem.length === 1) {
        errorMessage = 'Хеш-тег не может состоять только из одной решётки';
        window.data.errorInputOutline(hashtagUploadFile);
      } else if (hashtags.length > MAX_SYMBOL_HASHTAG) {
        errorMessage = 'Допустимое количество  хэш-тегов  не более ' + MAX_SYMBOL_HASHTAG + '.';
        window.data.errorInputOutline(hashtagUploadFile);
      } else if (hashtagItem.length > MAX_HASHTAG) {
        errorMessage = 'Максимальная длина одного хэш-тега ' + MAX_HASHTAG + ' символов, включая решётку';
        window.data.errorInputOutline(hashtagUploadFile);
      } else if (checkSimilarHashtags(hashtags)) {
        errorMessage = 'Хэштеги не должны повторяться';
        window.data.errorInputOutline(hashtagUploadFile);
      }
    });

    hashtagUploadFile.setCustomValidity(errorMessage);
  };

  hashtagUploadFile.addEventListener('change', hashtagValidation);

  // валидация описания к новой картинке

  var descriptionValidity = function() {
    var errorMessage = '';
    var descriptionValue = descriptionUploadFile.value.trim();

    if (descriptionValue === '') {
      descriptionUploadFile.setCustomValidity(errorMessage);
      return;
    }
    var descriptions = descriptionValue.toLowerCase().split(' ');
    descriptions.forEach(function (descriptionItem) {
      if (descriptionItem.length > LENGTH_COMMENT) {
        errorMessage = 'Максимальная длина комментария ' + LENGTH_COMMENT + ' символов';
      }
      window.data.errorInputOutline(descriptionUploadFile);
    });

    descriptionUploadFile.setCustomValidity(errorMessage);
  };

  descriptionUploadFile.addEventListener('input', descriptionValidity);

  window.validation = {
    hashtagUploadFile: hashtagUploadFile,
    descriptionUploadFile: descriptionUploadFile
  };
})();
