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
    WIDTH: 65,
    HEIGHT: 87 /* Ширина = батон + псевдоэлмент конус */
  }
};

var showElement = function () {
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');
};

var getRandomValue = function (minValue, maxValue) {
  return Math.round(Math.random() * (maxValue - minValue) + minValue);
};

var getRandomArray = function (array, items) {
  array.sort(compareRandom);
  var newArray = [];
  for (var i = 0; i < items; i++) {
    newArray.push(array[i]);
  }
  return newArray;
};

var compareRandom = function () {
  return Math.random() - 0.5;
};

var adObject = {};
var adArray = [];

var createAdArray = function () {
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
  var mapPinTemplate = document.querySelector('.map__pin');
  var mapPin = mapPinTemplate.cloneNode(true);
  var mapPinImg = mapPin.querySelector('img');

  mapPin.setAttribute('style', 'left:' + (adArray[index].location.x - AD_PARAMS.PIN.WIDTH / 2) + 'px; top:' + (adArray[index].location.y - AD_PARAMS.PIN.HEIGHT) + 'px;');
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


showElement();
createAdArray();
createMapPins();
