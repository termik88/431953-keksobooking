'use strict';

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
  var featureList = mapCard.querySelector('ul');
  featureList.innerHTML = '';
  featureList.appendChild(getFeature(arrayFeatures));
};

var createMapCard = function (object) {
  var mapFiltersContainer = document.querySelector('.filters-container');
  var mapCardText = mapCard.querySelectorAll('p');

  mapCard.querySelector('h3').textContent = object.offer.title;
  mapCard.querySelector('small').textContent = object.offer.address;
  mapCard.querySelector('.popup__price').textContent = object.offer.price + ' Р/ночь';
  mapCard.querySelector('h4').textContent = definitionType(object.offer.type);
  mapCardText[2].textContent = object.offer.rooms + ' комнаты для ' + object.offer.guests + ' гостей';
  mapCardText[3].textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout;
  renderFeatures(object.offer.features);
  mapCardText[4].textContent = object.offer.description;
  mapCard.querySelector('.popup__avatar').setAttribute('src', object.author.avatar);
  map.insertBefore(mapCard, mapFiltersContainer);
  mapCard.classList.add('hidden');
};
