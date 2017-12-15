'use strict';

/* Фукция создания меток на карте */
var renderMapPin = function (index) {
  var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var mapPin = mapPinTemplate.cloneNode(true);
  var mapPinImg = mapPin.querySelector('img');

  var openPupup = function () {
    var mapPinActive = document.querySelector('.map__pin--active');
    if (mapPinActive) {
      mapPinActive.classList.remove('map__pin--active');
    }
    mapPin.classList.add('map__pin--active');
    createMapCard(adArray[index]);
    mapCard.classList.remove('hidden');
  };

  var closePopup = function () {
    mapPin.classList.remove('map__pin--active');
    mapCard.classList.add('hidden');
  };

  mapPin.addEventListener('click', function () {
    openPupup();

    var buttonPopupClose = document.querySelector('.popup__close');
    buttonPopupClose.addEventListener('click', function () {
      closePopup();
    });
  });

  mapPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEY_CODE.ENTER) {
      openPupup();
    }
  });

  mapPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEY_CODE.ESC) {
      closePopup();
    }
  });

  mapPin.setAttribute('style', 'left:' + (adArray[index].location.x - AD_PARAMS.PIN.WIDTH / 2) + 'px; top:' + (adArray[index].location.y - AD_PARAMS.PIN.HEIGHT) + 'px;');
  mapPin.classList.add('hidden');
  mapPinImg.setAttribute('src', adArray[index].author.avatar);

  return mapPin;
};

var createMapPins = function () {
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < adArray.length; i++) {
    fragment.appendChild(renderMapPin(i));
  }
  mapPins.appendChild(fragment);
};

createMapPins();
