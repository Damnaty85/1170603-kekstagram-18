'use strict';

(function () {

// Валидация хэштегов и описания для фото

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
        errorMessage = 'Хэштег должен начинаться с символа #';
      } else if (hashtagItem.indexOf('#', 1) > 1) {
        errorMessage = 'Хэш-теги разделяются пробелами';
      } else if (hashtagItem.charAt(0) === '#' && hashtagItem.length === 1) {
        errorMessage = 'Хеш-тег не может состоять только из одной решётки';
      } else if (hashtags.length > 5) {
        errorMessage = 'Допустимое количество  хэштегов  не более 5';
      } else if (hashtagItem.length > 20) {
        errorMessage = 'Максимальная длина одного хэш-тега 20 символов, включая решётку';
      } else if (checkSimilarHashtags(hashtags)) {
        errorMessage = 'Хэштеги не должны повторяться';
      }
    });

    hashtagUploadFile.setCustomValidity(errorMessage);
  };

// валидация описания к новой картинке

  function descriptionValidity() {
    var errorMessage = '';
    var descriptionValue = descriptionUploadFile.value.trim();

    if (descriptionValue === '') {
      descriptionUploadFile.setCustomValidity(errorMessage);
      return;
    }
    var descriptions = descriptionValue.toLowerCase().split(' ');
    descriptions.forEach(function (descriptionItem) {
      if (descriptionItem.length > 140) {
        errorMessage = 'Максимальная длина комментария 140 символов';
      }
    });

    descriptionUploadFile.setCustomValidity(errorMessage);
  }

  descriptionUploadFile.addEventListener('input', descriptionValidity);

  hashtagUploadFile.addEventListener('input', hashtagValidation);

  window.validation = {
    descriptionUploadFile: descriptionUploadFile,
    hashtagUploadFile: hashtagUploadFile
  }
})();
