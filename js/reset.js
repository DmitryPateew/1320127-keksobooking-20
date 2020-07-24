'use strict';
(function () {
  window.getSiteInStart = function () {
    var disable = true;
    window.disableEnableInputs(disable);
    var activ = document.querySelector('.map');
    var formActiv = document.querySelector('.ad-form');
    activ.classList.add('map--faded');
    formActiv.classList.add('ad-form--disabled');
    var pins = document.querySelectorAll('.map__pin');
    var count = pins.length;
    if (count > 1) {
      window.deletePins();
    }
    var popup = document.querySelector('.popup');
    if (popup) {
      popup.remove();
    }
    var form = document.querySelector('.ad-form');
    form.reset();
    var filter = document.querySelector('.map__filters');
    filter.reset();
    var position = document.querySelector('#address');
    position.value = '570px ' + '375px';
    var mainPin = document.querySelector('.map__pin--main');
    mainPin.style.left = '570px';
    mainPin.style.top = '375px';
  };

  var reset = function () {
    var resetButton = document.querySelector('.ad-form__reset');
    resetButton.addEventListener('click', function () {
      window.getSiteInStart();
    });
    resetButton.addEventListener('keypress', function (evt) {
      if (evt.key === 'Enter') {
        window.getSiteInStart();
      }
    });
    resetButton.removeEventListener('click', function () {
    });
    resetButton.removeEventListener('keypress', function () {
    });
  };
  reset();
})();
