'use strict';

(function () {

  var KEY_CODE = {
    ESC: 27,
    ENTER: 13
  };

  var DEBOUNCE_INTERVAL = 300;
  var lastTimeout;

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === KEY_CODE.ESC) {
        action();
      }
    },

    isEnterEvent: function (evt, action) {
      if (evt.keyCode === KEY_CODE.ENTER) {
        action();
      }
    },

    /* Обработчик ошибок для работы с сервером*/
    errorHandler: function (errorMessage) {
      var errorWindow = document.createElement('div');
      errorWindow.setAttribute('style', 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;');
      errorWindow.style.position = 'absolute';
      errorWindow.style.left = 0;
      errorWindow.style.right = 0;
      errorWindow.style.fontSize = '30px';
      errorWindow.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', errorWindow);
    },

    debounce: function (fun) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
    }
  };

})();
