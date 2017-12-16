'use strict';

(function () {

  /* Переменные для функции загрузки страницы */
  window.map = document.querySelector('.map');
  var mapPinMain = window.map.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.notice__form');

  /* Переменные Лиснера для Мейн Пина */
  var noticeFormDisabled = document.querySelector('.notice__form--disabled');
  var formFieldSet = noticeForm.querySelectorAll('fieldset');
  var numberClickMapPinMain = 0; /* Счетчик кликов по главному пину. Страховка под клонирования пинов объявлений */

  /* Функция отвечающая за загрузку страницы */
  var testContainsClass = function (object, nameClass) {
    if (!object.classList.contains(nameClass)) {
      object.classList.add(nameClass);
    }
  };

  var openPage = function () {
    testContainsClass(window.map, 'map--faded');
    testContainsClass(noticeFormDisabled, 'notice__form--disabled');

    for (var i = 0; i < formFieldSet.length; i++) {
      if (!formFieldSet[i].hasAttribute('disabled')) {
        formFieldSet[i].setAttribute('disabled', 'disable');
      }
    }
  };

  openPage();

  /* Лиснер для Главного Пина */
  mapPinMain.addEventListener('mouseup', function () {
    var mapPinHidden = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < mapPinHidden.length; i++) {
      mapPinHidden[i].classList.remove('hidden');
    }

    window.map.classList.remove('map--faded');

    if (numberClickMapPinMain === 0) {
      noticeForm.classList.remove('notice__form--disabled');
      for (var j = 0; j < formFieldSet.length; j++) {
        if (formFieldSet[j].hasAttribute('disabled')) {
          formFieldSet[j].removeAttribute('disabled');
        }
      }
      numberClickMapPinMain++;
    }
  });

})();
