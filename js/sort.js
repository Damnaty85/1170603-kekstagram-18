'use strict';

(function () {
  var RANDOM_PICTURE = 10;
  var DEBOUNCE = 500;

  var picturesContainerElement = document.querySelector('.pictures');
  var pictureSortsSection = document.querySelector('.img-filters');
  var pictureSortPopular = pictureSortsSection.querySelector('#filter-popular');
  var pictureSortRandom = pictureSortsSection.querySelector('#filter-random');
  var pictureSortDiscuss = pictureSortsSection.querySelector('#filter-discussed');
  var pictureSortButton = pictureSortsSection.querySelectorAll('.img-filters__button');

  var timeout = 0;

  // Удаляем все элементы elements

  var elementsRemove = function (elements) {
    Array.from(elements).forEach(function (element) {
      element.remove();
    });
  };

  // Удаляем подсветку активной кнопки

  var elementsRemoveClass = function (className) {
    pictureSortButton.forEach(function (element) {
      if (element.classList.contains(className)) {
        element.classList.remove(className);
      }
    });
  };

  // Алгоритм тасования Фишера-Йетса

  var shuffle = function (arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  };

  // Переключаем состояние

  var onToggleButtonActive = function (selectorButton) {
    elementsRemoveClass('img-filters__button--active');
    selectorButton.classList.add('img-filters__button--active');
  };

  // Находим и удаляем все старые картинки посты и вставляем новые

  var onFilterButtonClick = function (pictureData) {
    var pictureItems = picturesContainerElement.querySelectorAll('.picture');
    elementsRemove(pictureItems);
    window.picture.renderUserPictures(pictureData);
  };

  // Обработчик кнопки "Популярные"

  var onSortPopularClick = function () {
    onFilterButtonClick(window.xhrDataPicture);
  };

  // Обработчик кнопки "Случайные"

  var onSortRandomClick = function () {
    var randomPicture = shuffle(window.xhrDataPicture.slice()).slice(0, RANDOM_PICTURE);
    onFilterButtonClick(randomPicture);
  };

  // Обработчик кнопки "Обсуждаемые"

  var onSortDiscussClick = function () {
    var discussedPosts = window.xhrDataPicture.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    onFilterButtonClick(discussedPosts);
  };

  // Функция устранения "дребезга" (debounce)

  var debounce = function (func) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(func, DEBOUNCE);
  };

  pictureSortPopular.addEventListener('click', function () {
    onToggleButtonActive(pictureSortPopular);
    debounce(onSortPopularClick);
  });

  pictureSortRandom.addEventListener('click', function () {
    onToggleButtonActive(pictureSortRandom);
    debounce(onSortRandomClick);
  });

  pictureSortDiscuss.addEventListener('click', function () {
    onToggleButtonActive(pictureSortDiscuss);
    debounce(onSortDiscussClick);
  });
})();
