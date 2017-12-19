'use strict';

/* Фукция создания меток на карте */
(function () {

  var PIN = {WIDTH: 43, HEIGHT: 64}; /* Ширина = батон + псевдоэлмент конус */

  var renderMapPin = function (index) {
    var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
    var mapPin = mapPinTemplate.cloneNode(true);
    var mapPinImg = mapPin.querySelector('img');

    mapPin.setAttribute('style', 'left:' + (window.adArray[index].location.x - PIN.WIDTH / 2)
      + 'px; top:' + (window.adArray[index].location.y - PIN.HEIGHT) + 'px;');
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
