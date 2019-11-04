'use ctrict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('#upload-file');
  var previewPicture = document.querySelector('.img-upload__preview img');
  var effectPreviewPicture = document.querySelectorAll('.effects__preview');
  previewPicture.parentElement.style = 'background-color: unset';

  var renderNewImages = function (imageDataURL) {
    previewPicture.src = imageDataURL;
    for (var i = effectPreviewPicture.length; i--;) {
      effectPreviewPicture[i].style.backgroundImage = 'url("' + imageDataURL + '")';
    }
  };

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewPicture.src = reader.result;
        renderNewImages(previewPicture.src);
      });

      reader.readAsDataURL(file);
    } else {
      window.upload.onError();
      document.querySelector('.error__title').textContent = 'Не верный формат файла';
    }
  });
})();
