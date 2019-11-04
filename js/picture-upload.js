'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var ERROR_TEXT = 'Не верный формат файла';

  var previewPicture = document.querySelector('.img-upload__preview img');
  var effectPreviewPicture = document.querySelectorAll('.effects__preview');
  previewPicture.parentElement.style = 'background-color: unset';

  var renderPreviewEffect = function (imageDataURL) {
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
        renderPreviewEffect(previewPicture.src);
      });

      reader.readAsDataURL(file);
    } else {

      // вызываем заготовленное окно ошибки и меняем в нем текст

      window.upload.onError();
      document.querySelector('.error__title').textContent = ERROR_TEXT;
    }
  });
})();
