'use strict';

/* Функция синхронизации данных */
(function () {

  window.synchronizeFields = function (objectOne, objectTwo, valuesObjectOne, valuesObjectTwo, callBackFunction) {

    objectOne.addEventListener('input', function () {
      var index = valuesObjectOne.indexOf(objectOne.value);
      callBackFunction(objectTwo, valuesObjectTwo[index]);
    });
  };

})();
