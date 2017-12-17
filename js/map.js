'use strict';

(function () {

  var PIN_MAIN = {WIDTH: 62, HEIGHT: 84}; /* Ширина = батон + псевдоэлмент конус */

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
    window.map.dropzone = 'move';
    mapPinMain.draggable = 'true';

    for (var i = 0; i < formFieldSet.length; i++) {
      if (!formFieldSet[i].hasAttribute('disabled')) {
        formFieldSet[i].setAttribute('disabled', 'disable');
      }
    }
  };

  openPage();

  /* Лиснер для Главного Пина */
  mapPinMain.addEventListener('mousedown', function (evt) {
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

    /* Перемешение Главного Пина */
    var startCoords = {x: evt.clientX, y: evt.pageY};
    var addressInput = document.querySelector('#address');

    var onDragMapPinMain = function (moveEvt) {
      moveEvt.preventDefault();

      var testLocation = function (number, locationMin, locationMax) {
        if (number >= locationMin && number <= locationMax) {
          return number;
        } else if (number < locationMin) {
          return locationMin;
        } else {
          return locationMax;
        }
      };

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.pageY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.pageY
      };

      mapPinMain.style.top = testLocation((startCoords.y + shift.y), window.AD_PARAMS.LOCATION.Y.MIN, window.AD_PARAMS.LOCATION.Y.MAX) + 'px';
      mapPinMain.style.left = (testLocation((startCoords.x + shift.x), window.AD_PARAMS.LOCATION.X.MIN, window.AD_PARAMS.LOCATION.X.MAX) - PIN_MAIN.WIDTH / 2) + 'px';
      addressInput.value = 'x: ' + mapPinMain.style.left + ', y:' + mapPinMain.style.top;
    };

    var onDragEndMapPinMian = function (endEvt) {
      endEvt.preventDefault();

      document.removeEventListener('drag', onDragMapPinMain);
      document.removeEventListener('dragend', onDragEndMapPinMian);
    };

    document.addEventListener('drag', onDragMapPinMain);
    document.addEventListener('dragend', onDragEndMapPinMian);

  });

})();
