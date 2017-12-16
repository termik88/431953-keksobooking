'use strict';

(function () {

  window.AD_PARAMS = {
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
    PRICE: {MIN: 1000, MAX: 1000000},
    TYPE: ['flat', 'house', 'bungalo'],
    ROOMS: {MIN: 1, MAX: 5},
    GUESTS: {MIN: 1, MAX: 10},
    CHECKIN: ['12:00', '13:00', '14:00'],
    CHECKOUT: ['12:00', '13:00', '14:00'],
    FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    LOCATION: {X: {MIN: 300, MAX: 900}, Y: {MIN: 100, MAX: 500}},
    PIN: {WIDTH: 43, HEIGHT: 64 /* Ширина = батон + псевдоэлмент конус */
    }
  };

  window.adArray = [];

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

    for (var i = 0; i < window.AD_PARAMS.NUMBER; i++) {
      var x = getRandomValue(window.AD_PARAMS.LOCATION.X.MIN, window.AD_PARAMS.LOCATION.X.MAX);
      var y = getRandomValue(window.AD_PARAMS.LOCATION.Y.MIN, window.AD_PARAMS.LOCATION.Y.MAX);

      adObject = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: window.AD_PARAMS.TITLE[i],
          address: x + ',' + y,
          price: getRandomValue(window.AD_PARAMS.PRICE.MIN, window.AD_PARAMS.PRICE.MAX),
          type: window.AD_PARAMS.TYPE[getRandomValue(0, window.AD_PARAMS.TYPE.length - 1)],
          rooms: getRandomValue(window.AD_PARAMS.ROOMS.MIN, window.AD_PARAMS.ROOMS.MAX),
          guests: getRandomValue(window.AD_PARAMS.GUESTS.MIN, window.AD_PARAMS.GUESTS.MAX),
          checkin: window.AD_PARAMS.CHECKIN[getRandomValue(0, window.AD_PARAMS.CHECKIN.length - 1)],
          checkout: window.AD_PARAMS.CHECKOUT[getRandomValue(0, window.AD_PARAMS.CHECKOUT.length - 1)],
          features: getRandomArray(window.AD_PARAMS.FEATURES, getRandomValue(0, window.AD_PARAMS.FEATURES.length - 1)),
          description: '',
          photos: []
        },
        location: {
          x: x,
          y: y
        }
      };
      window.adArray.push(adObject);
    }
  };

  createAdArray();

})();
