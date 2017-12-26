'use strict';

(function () {

  var TYPE_ACCOMMODATION = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом'
  };

  /* Переменные для генерации карточек объявлений */
  var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
  window.mapCard = mapCardTemplate.cloneNode(true);

  var getFeature = function (features) {
    var featureListFragment = document.createDocumentFragment();
    for (var i = 0; i < features.length; i++) {
      var featureListNewElement = document.createElement('li');
      featureListNewElement.className = 'feature feature--' + features[i];
      featureListFragment.appendChild(featureListNewElement);
    }
    return featureListFragment;
  };

  var renderFeatures = function (arrayFeatures) {
    var featureList = window.mapCard.querySelector('ul');
    featureList.innerHTML = '';
    featureList.appendChild(getFeature(arrayFeatures));
  };

  window.showCard = function (object) {
    var mapFiltersContainer = document.querySelector('.filters-container');
    var mapCardText = window.mapCard.querySelectorAll('p');

    window.mapCard.querySelector('h3').textContent = object.offer.title;
    window.mapCard.querySelector('small').textContent = object.offer.address;
    window.mapCard.querySelector('.popup__price').textContent = object.offer.price + ' Р/ночь';
    window.mapCard.querySelector('h4').textContent = TYPE_ACCOMMODATION[object.offer.type];
    mapCardText[2].textContent = object.offer.rooms + ' комнаты для ' + object.offer.guests + ' гостей';
    mapCardText[3].textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout;
    renderFeatures(object.offer.features);
    mapCardText[4].textContent = object.offer.description;
    window.mapCard.querySelector('.popup__avatar').setAttribute('src', object.author.avatar);
    window.map.insertBefore(window.mapCard, mapFiltersContainer);
  };

  window.hiddenCard = function () {
    window.mapCard.classList.add('hidden');
  };

})();
