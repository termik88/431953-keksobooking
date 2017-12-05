'use strict';

var AD_PARAMS = {
  NUMBER: 8,
  TITLE: [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'],
  PRICE: {
    MIN: 1000,
    MAX: 1000000
  },
  TYPE: [
    'flat',
    'house',
    'bungalo'],
  ROOMS: {
    MIN: 1,
    MAX: 5
  },
  GUESTS: {
    MIN: 1,
    MAX: 10
  },
  CHECKIN: [
    '12:00',
    '13:00',
    '14:00'],
  CHECKOUT: [
    '12:00',
    '13:00',
    '14:00'],
  FEATURES: [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'],
  LOCATION: {
    X: {
      MIN: 300,
      MAX: 900
    },
    Y: {
      MIN: 100,
      MAX: 500
    }
  },
  PIN: {
    WIDTH: 43,
    HEIGHT: 64 /* Ширина = батон + псевдоэлмент конус */
  }
};

var map = document.querySelector('.map');
var adArray = [];

var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
var mapCard = mapCardTemplate.cloneNode(true);

/* Функция отображения окна*/
var showElement = function () {
  map.classList.remove('map--faded');
};

/* Функции для рандомной выборки значения из заданного диапазона */
var getRandomValue = function (minValue, maxValue) {
  return Math.round(Math.random() * (maxValue - minValue + 1) + minValue - 0.5);
};

/* Функция для рандомного отображения элементов массива */
var getRandomArray = function (array, items) {
  array.sort(compareRandom);
  var newArray = [];
  for (var i = 0; i < items; i++) {
    newArray.push(array[i]);
  }
  return newArray;
};

/* Функция задания индекса для случайной сортировки массива */
var compareRandom = function () {
  return Math.random() - 0.5;
};

/* Функция создания массива объектов */
var createAdArray = function () {
  var adObject = {};

  for (var i = 0; i < AD_PARAMS.NUMBER; i++) {
    var x = getRandomValue(AD_PARAMS.LOCATION.X.MIN, AD_PARAMS.LOCATION.X.MAX);
    var y = getRandomValue(AD_PARAMS.LOCATION.Y.MIN, AD_PARAMS.LOCATION.Y.MAX);

    adObject = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: AD_PARAMS.TITLE[i],
        address: x + ',' + y,
        price: getRandomValue(AD_PARAMS.PRICE.MIN, AD_PARAMS.PRICE.MAX),
        type: AD_PARAMS.TYPE[getRandomValue(0, AD_PARAMS.TYPE.length - 1)],
        rooms: getRandomValue(AD_PARAMS.ROOMS.MIN, AD_PARAMS.ROOMS.MAX),
        guests: getRandomValue(AD_PARAMS.GUESTS.MIN, AD_PARAMS.GUESTS.MAX),
        checkin: AD_PARAMS.CHECKIN[getRandomValue(0, AD_PARAMS.CHECKIN.length - 1)],
        checkout: AD_PARAMS.CHECKOUT[getRandomValue(0, AD_PARAMS.CHECKOUT.length - 1)],
        features: getRandomArray(AD_PARAMS.FEATURES, getRandomValue(0, AD_PARAMS.FEATURES.length - 1)),
        description: '',
        photos: []
      },
      location: {
        x: x,
        y: y
      }
    };
    adArray.push(adObject);
  }
};

var renderMapPin = function (index) {
  var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var mapPin = mapPinTemplate.cloneNode(true);
  var mapPinImg = mapPin.querySelector('img');

  mapPin.setAttribute('style', 'left:' + (adArray[index].location.x - AD_PARAMS.PIN.WIDTH / 2) + 'px; top:' + (adArray[index].location.y - AD_PARAMS.PIN.HEIGHT) + 'px;');
  mapPinImg.setAttribute('src', adArray[index].author.avatar);

  return mapPin;
};

/* Фукция создания меток на карте */
var createMapPins = function () {
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < adArray.length; i++) {
    fragment.appendChild(renderMapPin(i));
  }
  mapPins.appendChild(fragment);
};

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
  mapCard.querySelector('.popup__features').setAttribute('src', object.author.avatar);
  map.insertBefore(mapCard, mapFiltersContainer);
};

showElement();
createAdArray();
createMapPins();
createMapCard(adArray[0]);
