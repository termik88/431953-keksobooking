'use strict';

(function () {

  var TYPES_ACCOMMODATION = ['bungalo', 'flat', 'house', 'palace'];
  var PRICES_LIMIT = {MIN: 1000, MAX: 1000000, FIX: [0, 1000, 5000, 10000]};
  var CHECK_IN = ['12:00', '13:00', '14:00'];
  var CHECK_OUT = ['12:00', '13:00', '14:00'];

  var noticeForm = document.querySelector('.notice__form');
  var formFieldSet = document.querySelectorAll('fieldset');
  var numberClickMapPinMain = 0;

  window.activeForm = function () {
    if (numberClickMapPinMain === 0) {
      noticeForm.classList.remove('notice__form--disabled');
      for (var j = 0; j < formFieldSet.length; j++) {
        if (formFieldSet[j].hasAttribute('disabled')) {
          formFieldSet[j].removeAttribute('disabled');
        }
      }
      numberClickMapPinMain++;
    }
  };

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

  var addressInput = document.querySelector('#address');
  addressInput.addEventListener('invalid', function () {
    if (addressInput.validity.valueMissing) {
      validationRequired(addressInput);
    } else {
      validationNormal(addressInput);
    }
  });

  /* Всплывающие подсказки поля Title */
  var titleInput = document.querySelector('#title');
  titleInput.addEventListener('invalid', function () {
    paintError(titleInput);
    if (titleInput.validity.tooShort) {
      titleInput.setCustomValidity('Минимальная длина заголовка — ' + titleInput.minLength + ' символов');
    } else if (titleInput.validity.tooLong) {
      titleInput.setCustomValidity('Макcимальная длина заголовка — ' + titleInput.maxLength + ' символов');
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
    if (target.value.length < titleInput.minLength) {
      target.setCustomValidity('Минимальная длина заголовка — ' + titleInput.minLength + ' символов');
    } else {
      validationNormal(target);
    }
  });

  /* Всплывающие подсказки поля Price */
  var priceInput = document.querySelector('#price');
  priceInput.addEventListener('invalid', function () {
    paintError(priceInput);
    if (priceInput.type !== 'number') {
      priceInput.setCustomValidity('Введи числовое значение');
    } else if (priceInput.value < PRICES_LIMIT.MIN) {
      priceInput.setCustomValidity('Минимальное значение — ' + PRICES_LIMIT.MIN);
    } else if (priceInput.value > PRICES_LIMIT.MAX) {
      priceInput.setCustomValidity('Макcимальное значение — ' + PRICES_LIMIT.MAX);
    } else if (priceInput.validity.valueMissing) {
      validationRequired(priceInput);
    } else {
      validationNormal(priceInput);
    }
  });

  /* Функция взаимодействия временых полей */
  var timeInSelect = document.querySelector('#timein');
  var timeOutSelect = document.querySelector('#timeout');

  var syncValues = function (element, value) {
    element.value = value;
  };

  window.synchronizeFields(timeInSelect, timeOutSelect, CHECK_IN, CHECK_OUT, syncValues);
  window.synchronizeFields(timeOutSelect, timeInSelect, CHECK_OUT, CHECK_IN, syncValues);

  /* Функция взаимодействия типа жилья и цен */
  var typesHouse = document.querySelector('#type');

  var syncValueWithMin = function (element, value) {
    element.min = value;

    if (element.value < value) {
      paintError(element);
    } else {
      validationNormal(element);
    }
  };

  window.synchronizeFields(typesHouse, priceInput, TYPES_ACCOMMODATION, PRICES_LIMIT.FIX, syncValueWithMin);

  /* Функция взаимодействия кол-во комнат и кол-во гостей */
  var selectNumbersRoom = document.querySelector('#room_number');
  var selectCapacity = document.querySelector('#capacity');
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

  /* Функция отправки формы на сервер */
  noticeForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(noticeForm), function () {
      noticeForm.reset(); /* сброс формы */
    }, window.util.errorHandler); /* Тело функции в util.js */
    evt.preventDefault();
  });

})();
