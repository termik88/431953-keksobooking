'use strict';

(function () {
  var PIN = {WIDTH: 43, HEIGHT: 64}; /* Ширина = батон + псевдоэлмент конус */

  window.renderAd = function (ad) {
    var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
    var mapPin = mapPinTemplate.cloneNode(true);
    var mapPinImg = mapPin.querySelector('img');
    mapPin.classList.remove('hidden');

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
    mapPinImg.setAttribute('src', ad.author.avatar);

    return mapPin;
  };

})();
