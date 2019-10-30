'use strict';
// Загружаем данные для картинок-постов с сервера

(function () {
  var loadData = function (URL, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        window.XhrDataImgPosts = xhr.response;
        onSuccess(window.XhrDataImgPosts);
        document.querySelector('.img-filters').classList.remove('img-filters--inactive');
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIME_OUT;

    xhr.open('GET', URL);
    xhr.send();
  };

  var onError = function (message) {
    scrollTo(0, 0);

    var divErrorElement = document.createElement('div');
    divErrorElement.style =
      'margin: 0 auto; padding: 15px 0; font-size: 30px; text-align: center; background-color: #ff4e4e';
    divErrorElement.style.position = 'absolute';
    divErrorElement.style.zIndex = '100';
    divErrorElement.style.left = 0;
    divErrorElement.style.right = 0;

    divErrorElement.textContent = message;

    document.body.insertAdjacentElement('afterbegin', divErrorElement);

    setTimeout(function () {
      divErrorElement.classList.add('hidden');
    }, TIME_OUT);
  };

  window.load = {
    loadData: loadData
  };

})();
