'use strict';

/* Фукция создания меток на карте */
(function () {
  var PIN_MAIN = {WIDTH: 62, HEIGHT: 84};
  var MAX_LIMIT_PINS = 5;

  var pinsArr = [];
  var showPin = [];
  var mapPins = window.map.querySelector('.map__pins');
  var mapPinMain = window.map.querySelector('.map__pin--main');
  var filters = window.map.querySelector('.map__filters');

  /* Лиснер для Главного Пина */
  mapPinMain.addEventListener('mousedown', function (evt) {
    window.map.classList.remove('map--faded');
    window.activeForm();

    /* Перемешение Главного Пина */
    var startCoords = {x: evt.clientX, y: evt.pageY};
    var addressInput = document.querySelector('#address');

    var onMouseMoveMapPinMain = function (moveEvt) {
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

      var currentCoords = {
        x: testLocation((mapPinMain.offsetLeft - shift.x), 0, window.map.clientWidth),
        y: testLocation((mapPinMain.offsetTop - shift.y), 100, window.map.clientHeight - 200)
      };

      mapPinMain.style.top = currentCoords.y + 'px';
      mapPinMain.style.left = currentCoords.x + 'px';

      var poinerCoords = {
        x: currentCoords.x + PIN_MAIN.WIDTH / 2,
        y: currentCoords.y + PIN_MAIN.HEIGHT / 2
      };

      addressInput.value = 'x: ' + poinerCoords.x + ', y:' + poinerCoords.y;
    };

    var onMouseUpMapPinMain = function (endEvt) {
      window.backend.load(successHandler, window.util.errorHandler);
      endEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMoveMapPinMain);
      document.removeEventListener('mouseup', onMouseUpMapPinMain);
    };

    document.addEventListener('mousemove', onMouseMoveMapPinMain);
    document.addEventListener('mouseup', onMouseUpMapPinMain);

  });

  var hidePins = function () {
    var activPin = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    activPin.forEach(function (currentPin) {
      mapPins.removeChild(currentPin);
    });
  };

  var updateMap = function () {
    var filterPinsArray = window.filter(pinsArr);

    hidePins();
    window.hiddenCard();
    if (filterPinsArray.length > MAX_LIMIT_PINS) {
      filterPinsArray = filterPinsArray.slice(MAX_LIMIT_PINS);
    }
    mapPins.appendChild(createFragment(filterPinsArray));
  };

  filters.addEventListener('change', function () {
    updateMap();
    window.util.debounce(updateMap);
  });

  /* Создание массива из Джонсон и Создание ноды */
  var createFragment = function (ads) {
    var fragment = document.createDocumentFragment();

    ads.forEach(function (item) {
      fragment.appendChild(window.renderAd(item));
    });

    return fragment;
  };

  var successHandler = function (array) {
    pinsArr = array.slice();
    showPin = pinsArr.slice(MAX_LIMIT_PINS); /* тесты */
    mapPins.appendChild(createFragment(showPin));
  };

})();
