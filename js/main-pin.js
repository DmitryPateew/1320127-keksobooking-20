'use strict';

(function () {
  var MIN_TOP_VALUE = 88;
  var MAX_TOP_VALUE = 588;

  var X_SIZE = 31;
  var Y_SIZE = 42;

  var mainPin = document.querySelector('.map__pin--main');
  var adressField = document.querySelector('#address');

  adressField.disabled = true;
  adressField.value = '570px' + '375px';

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (mainPin.offsetTop - shift.y < MIN_TOP_VALUE) {
        mainPin.style.top = '88px';
      } else {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      }
      if (mainPin.offsetTop - shift.y > MAX_TOP_VALUE) {
        mainPin.style.top = '588px';
      } else {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      }

      var mapWith = document.documentElement.clientWidth;

      var maxLeftValue = 1169;
      var minLeftValue = -30;

      if (mapWith < maxLeftValue) {
        maxLeftValue = mapWith;
      }

      if (mainPin.offsetLeft - shift.x < minLeftValue) {
        mainPin.style.left = minLeftValue + 'px';
      } else {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }

      if (mainPin.offsetLeft - shift.x > maxLeftValue) {
        mainPin.style.left = maxLeftValue + 'px';
      } else {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }

      adressField.value = (mainPin.offsetTop - shift.y + Y_SIZE) + 'px ' + (mainPin.offsetLeft - shift.x + X_SIZE) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          mainPin.removeEventListener('click', onClickPreventDefault);
        };
        mainPin.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });
})();
