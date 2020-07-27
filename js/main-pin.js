'use strict';

(function () {
  var MIN_TOP_VALUE = 120;
  var MAX_TOP_VALUE = 548;

  var MIN__LEFT__VALUE = 134;
  var MAX__LEFT__VALUE = 1268;

  var X_SIZE = 34;
  var Y_SIZE = 87;


  var mainPin = document.querySelector('.map__pin--main');
  var adressField = document.querySelector('#address');
  adressField.value = '600px ' + '380px';
  adressField.disabled = true;

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

      if (moveEvt.clientY > MIN_TOP_VALUE && moveEvt.clientY < MAX_TOP_VALUE) {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      }

      if (moveEvt.clientX > MIN__LEFT__VALUE && moveEvt.clientX < MAX__LEFT__VALUE) {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }
      var yCoord = mainPin.offsetTop - shift.y + Y_SIZE;
      if (yCoord < 130) {
        adressField.value = (mainPin.offsetLeft - shift.x + X_SIZE) + 'px ' + '130px';
      } else {
        adressField.value = (mainPin.offsetLeft - shift.x + X_SIZE) + 'px ' + (mainPin.offsetTop - shift.y + Y_SIZE) + 'px';
      }

      if (yCoord > 630) {
        adressField.value = (mainPin.offsetLeft - shift.x + X_SIZE) + 'px ' + '630px';
      } else {
        adressField.value = (mainPin.offsetLeft - shift.x + X_SIZE) + 'px ' + (mainPin.offsetTop - shift.y + Y_SIZE) + 'px';
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
