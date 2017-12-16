'use strict';

(function () {

  /* Переменные для генерации карточек объявлений */
  var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
  window.mapCard = mapCardTemplate.cloneNode(true);

  /* Функции для создания карточки */
  var definitionType = function (type) {
    var valueType = '';

    if (type === 'flat') {
      valueType = 'Квартира';
    }
    if (type === 'bungalo') {
      valueType = 'Бунгало';
    }
    if (type === 'house') {
      valueType = 'Дом';
    }
    return valueType;
  };

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

  window.createMapCard = function (object) {
    var mapFiltersContainer = document.querySelector('.filters-container');
    var mapCardText = window.mapCard.querySelectorAll('p');

    window.mapCard.querySelector('h3').textContent = object.offer.title;
    window.mapCard.querySelector('small').textContent = object.offer.address;
    window.mapCard.querySelector('.popup__price').textContent = object.offer.price + ' Р/ночь';
    window.mapCard.querySelector('h4').textContent = definitionType(object.offer.type);
    mapCardText[2].textContent = object.offer.rooms + ' комнаты для ' + object.offer.guests + ' гостей';
    mapCardText[3].textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout;
    renderFeatures(object.offer.features);
    mapCardText[4].textContent = object.offer.description;
    window.mapCard.querySelector('.popup__avatar').setAttribute('src', object.author.avatar);
    window.map.insertBefore(window.mapCard, mapFiltersContainer);
    window.mapCard.classList.add('hidden');
  };

})();
