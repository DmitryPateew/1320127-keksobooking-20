'use strict';

(function () {
  var MIN_TOP_VALUE = 122;
  var MAX_TOP_VALUE = 542;

  var MAP__WITH = 1200;
  var X_SIZE = 65;
  var X_SIZE__FOR__INPUT = 32;
  var Y_SIZE = 87;

  var mainPin = document.querySelector('.map__pin--main');
  var adressField = document.querySelector('#address');
  adressField.value = '600px ' + '380px';
  adressField.disabled = true;

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var screenWith = document.documentElement.clientWidth;
    var startX = (screenWith - MAP__WITH + X_SIZE) / 2;
    var finishX = startX + MAP__WITH - X_SIZE;
    var startCoords = {
      x: evt.pageX,
      y: evt.pageY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.pageX,
        y: startCoords.y - moveEvt.pageY
      };

      startCoords = {
        x: moveEvt.pageX,
        y: moveEvt.pageY
      };


      if (moveEvt.pageY > MIN_TOP_VALUE && moveEvt.pageY < MAX_TOP_VALUE) {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
        adressField.value = (mainPin.offsetLeft - shift.x + X_SIZE__FOR__INPUT) + 'px ' + (mainPin.offsetTop - shift.y + Y_SIZE) + 'px';
      }

      if (moveEvt.pageX > startX && moveEvt.pageX < finishX) {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
        adressField.value = (mainPin.offsetLeft - shift.x + X_SIZE__FOR__INPUT) + 'px ' + (mainPin.offsetTop - shift.y + Y_SIZE) + 'px';
      }
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
