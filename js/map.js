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

/* Фукция создания меток на карте */
var renderMapPin = function (index) {
  var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var mapPin = mapPinTemplate.cloneNode(true);
  var mapPinImg = mapPin.querySelector('img');

  var openPupup = function () {
    var mapPinActive = document.querySelector('.map__pin--active');
    if (mapPinActive) {
      mapPinActive.classList.remove('map__pin--active');
    }
    mapPin.classList.add('map__pin--active');
    createMapCard(adArray[index]);
    mapCard.classList.remove('hidden');
  };

  var closePopup = function () {
    mapPin.classList.remove('map__pin--active');
    mapCard.classList.add('hidden');
  };

  mapPin.addEventListener('click', function () {
    openPupup();

    var buttonPopupClose = document.querySelector('.popup__close');
    buttonPopupClose.addEventListener('click', function () {
      closePopup();
    });
  });

  mapPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEY_CODE.ENTER) {
      openPupup();
    }
  });

  mapPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEY_CODE.ESC) {
      closePopup();
    }
  });

  mapPin.setAttribute('style', 'left:' + (adArray[index].location.x - AD_PARAMS.PIN.WIDTH / 2) + 'px; top:' + (adArray[index].location.y - AD_PARAMS.PIN.HEIGHT) + 'px;');
  mapPin.classList.add('hidden');
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

createMapPins();

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
