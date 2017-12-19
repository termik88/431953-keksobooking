'use strict';

(function () {

  var showCard = function () {

    var mapPinActive = document.querySelector('.map__pin--active');
    if (mapPinActive) {
      mapPinActive.classList.remove('map__pin--active');
    }
    mapPin.classList.add('map__pin--active');
    window.createMapCard(window.adArray[index]);
    window.mapCard.classList.remove('hidden');
  };

  var closeCard = function () {
    mapPin.classList.remove('map__pin--active');
    window.mapCard.classList.add('hidden');
  };

  mapPin.addEventListener('click', function () {
    showCard();

    var buttonPopupClose = document.querySelector('.popup__close');
    buttonPopupClose.addEventListener('click', function () {
      closeCard();
    });
  });

  mapPin.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, showCard);
  });

  mapPin.addEventListener('keydown', function (evt) {
    window.util.isEscEvent(evt, closeCard);
  });

})();
