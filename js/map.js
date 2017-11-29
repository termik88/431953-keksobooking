'use strict';

var AD_PARAMS = {
  NUMBER: 8,
  /* "author": {
      "avatar": строка, адрес изображения вида img/avatars/user{{xx}}.png, где xx это число от 1 до 8 с ведущим нулем.
      Например 01, 02 и т. д. Адреса изображений не повторяются}, */
  TITLE: [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'],
  /* "address": строка, адрес предложения, представляет собой запись вида "{{location.x}}, {{location.y}}" */
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
  /* "guests": число, случайное количество гостей, которое можно разместить */
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
  /* "description": пустая строка, */
  /* "photos": пустой массив */
  LOCATION: {
    X: {
      MIN: 300,
      MAX: 900
    },
    Y: {
      MIN: 100,
      MAX: 500
    }
  }
};

var adArray = [];
var adObject = {};

var getRandomValue = function(minValue, maxValue) {
  return Math.round(Math.random() * (maxValue - minValue) + minValue);
}

var getRandomArray = function(array, items) {
  array.sort(compareRandom);
  var newArray = [];
  for (var i = 0; i < items; i++) {
      newArray.push(array[i]);
    }
  return newArray;
};

var compareRandom = function() {
  return Math.random() - 0.5;
};

var generateAdArray = function () {
  for (var i = 0; i < AD_PARAMS.NUMBER; i++) {
    adObject = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
    },

      offer: {
        title: AD_PARAMS.TITLE[i],
        address: строка, адрес предложения, представляет собой запись вида "{{location.x}}, {{location.y}}",
        price: getRandomValue(AD_PARAMS.PRICE.MIN, AD_PARAMS.PRICE.MAX),
        type: AD_PARAMS.TYPE[getRandomValue(1, AD_PARAMS.TYPE.length)],
        rooms: getRandomValue(AD_PARAMS.ROOMS.MIN, AD_PARAMS.ROOMS.MAX),
        guests: число, случайное количество гостей, которое можно разместить
        checkin: строка с одним из трех фиксированных значений: 12:00, 13:00 или 14:00,
        checkout: строка с одним из трех фиксированных значений: 12:00, 13:00 или 14:00
        features: массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
        description: '',
        photos: []
      },

      location {
        x: getRandomValue(300, 900),
        y: getRandomValue(100, 500)
      }
    }
  }
}
