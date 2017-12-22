'use strict';

(function () {

  window.map = document.querySelector('.map');
  var mapPinMain = window.map.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.notice__form');
  var noticeFormDisabled = document.querySelector('.notice__form--disabled');
  var formFieldSet = noticeForm.querySelectorAll('fieldset');

  var testContainsClass = function (object, nameClass) {
    if (!object.classList.contains(nameClass)) {
      object.classList.add(nameClass);
    }
  };

  var firstBootPage = function () {
    testContainsClass(window.map, 'map--faded');
    testContainsClass(noticeFormDisabled, 'notice__form--disabled');
    window.map.dropzone = 'move';
    mapPinMain.draggable = 'true';

    for (var i = 0; i < formFieldSet.length; i++) {
      if (!formFieldSet[i].hasAttribute('disabled')) {
        formFieldSet[i].setAttribute('disabled', 'disable');
      }
    }
  };

  firstBootPage();

})();
