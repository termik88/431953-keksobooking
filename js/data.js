'use strict';

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

createAdArray();
