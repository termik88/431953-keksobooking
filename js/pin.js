'use strict';

/* Фукция создания меток на карте */
(function () {

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
      window.createMapCard(window.adArray[index]);
      window.mapCard.classList.remove('hidden');
    };

    var closePopup = function () {
      mapPin.classList.remove('map__pin--active');
      window.mapCard.classList.add('hidden');
    };

    mapPin.addEventListener('click', function () {
      openPupup();

      var buttonPopupClose = document.querySelector('.popup__close');
      buttonPopupClose.addEventListener('click', function () {
        closePopup();
      });
    });

    mapPin.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, openPupup);
    });

    mapPin.addEventListener('keydown', function (evt) {
      window.util.isEscEvent(evt, closePopup);
    });

    mapPin.setAttribute('style', 'left:' + (window.adArray[index].location.x - window.AD_PARAMS.PIN.WIDTH / 2)
      + 'px; top:' + (window.adArray[index].location.y - window.AD_PARAMS.PIN.HEIGHT) + 'px;');
    mapPin.classList.add('hidden');
    mapPinImg.setAttribute('src', window.adArray[index].author.avatar);

    return mapPin;
  };

  var createMapPins = function () {
    var mapPins = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.adArray.length; i++) {
      fragment.appendChild(renderMapPin(i));
    }
    mapPins.appendChild(fragment);
  };

  createMapPins();


})();
