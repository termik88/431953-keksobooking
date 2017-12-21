'use strict';

/* Фукция создания меток на карте */
(function () {

  var PIN = {WIDTH: 43, HEIGHT: 64}; /* Ширина = батон + псевдоэлмент конус */

  var renderMapPin = function (ad) {
    var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
    var mapPin = mapPinTemplate.cloneNode(true);
    var mapPinImg = mapPin.querySelector('img');

    var openPupup = function () {
      var mapPinActive = document.querySelector('.map__pin--active');
      if (mapPinActive) {
        mapPinActive.classList.remove('map__pin--active');
      }
      mapPin.classList.add('map__pin--active');
      window.showCard(ad);
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

    mapPin.setAttribute('style', 'left:' + (ad.location.x - PIN.WIDTH / 2)
      + 'px; top:' + (ad.location.y - PIN.HEIGHT) + 'px;');
    mapPin.classList.add('hidden');
    mapPinImg.setAttribute('src', ad.author.avatar);

    return mapPin;
  };

  /* Отображение пинов */
  var mapPins = document.querySelector('.map__pins');
  var createMapPins = function (ads) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < ads.length; i++) {
      fragment.appendChild(renderMapPin(ads[i]));
    }
    mapPins.appendChild(fragment);
  };

  window.backend.load(createMapPins, window.errorHandler);

})();
