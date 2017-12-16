'use strict';

(function () {

  /* https://bitsofco.de/realtime-form-validation/ */
  /* Функции для работы с формой */
  /* Всплывающие подсказки поля Address */
  var paintError = function (object) {
    object.setAttribute('style', 'border-color: red;');
  };

  var validationRequired = function (object) {
    object.setCustomValidity('Обязательное поле');
    paintError(object);
  };

  var validationNormal = function (object) {
    object.setCustomValidity('');
    object.removeAttribute('style');
  };

  var addressInput = document.getElementById('address');
  addressInput.addEventListener('invalid', function () {
    if (addressInput.validity.valueMissing) {
      validationRequired(addressInput);
    } else {
      validationNormal(addressInput);
    }
  });

  /* Всплывающие подсказки поля Title */
  var titleInput = document.getElementById('title');
  titleInput.addEventListener('invalid', function () {
    paintError(titleInput);
    if (titleInput.validity.tooShort) {
      titleInput.setCustomValidity('Минимальная длина заголовка — 30 символов');
    } else if (titleInput.validity.tooLong) {
      titleInput.setCustomValidity('Макcимальная длина заголовка — 100 символов');
    } else if (titleInput.validity.valueMissing) {
      validationRequired(titleInput);
    } else {
      validationNormal(titleInput);
    }
  });

  /* Валидация по минимальной длине для EI and Edge поля Title*/
  titleInput.addEventListener('input', function (evt) {
    var target = evt.target;
    paintError(target);
    if (target.value.length < 30) {
      target.setCustomValidity('Минимальная длина заголовка — 30 символов');
    } else {
      validationNormal(target);
    }
  });

  /* Всплывающие подсказки поля Price */
  var priceInput = document.getElementById('price');
  priceInput.addEventListener('invalid', function () {
    paintError(priceInput);
    if (priceInput.type !== 'number') {
      priceInput.setCustomValidity('Введи числовое значение');
    } else if (priceInput.value < 0) {
      priceInput.setCustomValidity('Минимальное значение — 0');
    } else if (priceInput.value > 1000000) {
      priceInput.setCustomValidity('Макcимальное значение — 1000000');
    } else if (priceInput.validity.valueMissing) {
      validationRequired(priceInput);
    } else {
      validationNormal(priceInput);
    }
  });

  /* Функция взаимодействия временых полей */
  var timeInSelect = document.getElementById('timein');
  var timeOutSelect = document.getElementById('timeout');

  var temporaryConnectionInTime = function (time) {
    if (timeInSelect.value === time) {
      timeOutSelect.value = time;
    }
  };

  var temporaryConnectionInOut = function (time) {
    if (timeOutSelect.value === time) {
      timeInSelect.value = time;
    }
  };

  timeInSelect.addEventListener('input', function () {
    for (var i = 0; i < window.AD_PARAMS.CHECKIN.length; i++) {
      temporaryConnectionInTime(window.AD_PARAMS.CHECKIN[i]);
    }
  });

  timeOutSelect.addEventListener('input', function () {
    for (var i = 0; i < window.AD_PARAMS.CHECKOUT.length; i++) {
      temporaryConnectionInOut(window.AD_PARAMS.CHECKOUT[i]);
    }
  });

  /* Функция взаимодействия типа жилья и цен */
  var typesHouse = document.getElementById('type');

  var selectTypeHouse = function (type, price) {
    if (typesHouse.value === type) {
      priceInput.setAttribute('min', price);
      if (priceInput.value < price) {
        /* priceInput.setCustomValidity('Минимальная стоимость ' + type + 'составляет' + price); */
        paintError(priceInput);
      } else {
        validationNormal(priceInput);
      }
    }
  };

  typesHouse.addEventListener('input', function () {
    selectTypeHouse('bungalo', '0');
    selectTypeHouse('flat', '1000');
    selectTypeHouse('house', '5000');
    selectTypeHouse('palace', '10000');
  });

  /* Функция взаимодействия кол-во комнат и кол-во гостей */
  var selectNumbersRoom = document.getElementById('room_number');
  var selectCapacity = document.getElementById('capacity');
  var selectCapacityItem = selectCapacity.querySelectorAll('option');

  selectNumbersRoom.addEventListener('click', function () { /* Лиснер для первого клика, т.к по дефолту количество гостей = 3 */
    for (var i = 0; i < selectCapacityItem.length; i++) {
      selectCapacityItem[i].disabled = false;
    }
    if (selectNumbersRoom.value === '1') {
      selectCapacity.value = selectNumbersRoom.value;
      selectCapacityItem[0].disabled = true;
      selectCapacityItem[1].disabled = true;
      selectCapacityItem[3].disabled = true;
    }
    if (selectNumbersRoom.value === '2') {
      selectCapacity.value = '1';
      selectCapacityItem[0].disabled = true;
      selectCapacityItem[3].disabled = true;
    }
    if (selectNumbersRoom.value === '3') {
      selectCapacity.value = '1';
      selectCapacityItem[3].disabled = true;
    }
    if (selectNumbersRoom.value === '100') {
      selectCapacity.value = '0';
      selectCapacityItem[0].disabled = true;
      selectCapacityItem[1].disabled = true;
      selectCapacityItem[2].disabled = true;
    }
  });

})();
