'use strict';
/* Константы */
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
var KEY_CODE = {
  ESC: 27,
  ENTER: 13
};

/* Переменные для функции загрузки страницы */
var map = document.querySelector('.map');
var mapPinMain = map.querySelector('.map__pin--main');
var noticeForm = document.querySelector('.notice__form');

/* Переменные Лиснера для Мейн Пина */
var noticeFormDisabled = document.querySelector('.notice__form--disabled');
var formFieldSet = noticeForm.querySelectorAll('fieldset');
var numberClickMapPinMain = 0; /* Счетчик кликов по главному пину. Страховка под клонирования пинов объявлений */

/* Переменные для генерации данных масива объектов и карточек объявлений */
var adArray = [];

var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
var mapCard = mapCardTemplate.cloneNode(true);

/* Функция отвечающая за загрузку страницы */
var testContainsClass = function (object, nameClass) {
  if (!object.classList.contains(nameClass)) {
    object.classList.add(nameClass);
  }
};

var openPage = function () {
  testContainsClass(map, 'map--faded');
  testContainsClass(noticeFormDisabled, 'notice__form--disabled');

  for (var i = 0; i < formFieldSet.length; i++) {
    if (!formFieldSet[i].hasAttribute('disabled')) {
      formFieldSet[i].setAttribute('disabled', 'disable');
    }
  }
};

openPage();

/* Лиснер для Главного Пина */
mapPinMain.addEventListener('mouseup', function () {
  var mapPinHidden = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  for (var i = 0; i < mapPinHidden.length; i++) {
    mapPinHidden[i].classList.remove('hidden');
  }

  map.classList.remove('map--faded');

  if (numberClickMapPinMain === 0) {
    noticeForm.classList.remove('notice__form--disabled');
    for (var j = 0; j < formFieldSet.length; j++) {
      if (formFieldSet[j].hasAttribute('disabled')) {
        formFieldSet[j].removeAttribute('disabled');
      }
    }
    numberClickMapPinMain++;
  }
});

