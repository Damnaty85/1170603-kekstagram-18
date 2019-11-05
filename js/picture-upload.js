'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var previewPicture = document.querySelector('.img-upload__preview img');
  var effectPreviewPicture = document.querySelectorAll('.effects__preview');
  previewPicture.parentElement.style = 'background-color: unset';

  var renderPreviewImgEffect = function (imageDataURL) {
    previewPicture.src = imageDataURL;
    for (var i = effectPreviewPicture.length; i--;) {
      effectPreviewPicture[i].style.backgroundImage = 'url("' + imageDataURL + '")';
    }
  };

  window.form.uploadFilePicture.addEventListener('change', function () {
    var file = window.form.uploadFilePicture.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewPicture.src = reader.result;
        renderPreviewImgEffect(previewPicture.src);
      });

      reader.readAsDataURL(file);
    } else {
      window.upload.onError();
      document.querySelector('.error__title').textContent = 'Не верный формат файла';
    }
  });
})();
