'use strict';
(function () {

  var disable = true;

  window.disableEnableInputs = function (disableEnable) {
    var fildset = document.querySelectorAll('.ad-form__element');
    for (var i = 0; i < fildset.length; i++) {
      fildset[i].disabled = disableEnable;
    }
    var picture = document.querySelector('.ad-form-header');
    picture.disabled = disableEnable;
  };

  window.disableEnableInputs(disable);

  var mainPin = document.querySelector('.map__pin--main');

  var activationMap = function () {
    var enable = false;
    var activ = document.querySelector('.map');
    var formActiv = document.querySelector('.ad-form');

    mainPin.addEventListener('click', function () {
      activ.classList.remove('map--faded');
      formActiv.classList.remove('ad-form--disabled');
      window.disableEnableInputs(enable);
      window.filter();
      window.sendForm();
    });
    mainPin.addEventListener('keypress', function (evt) {
      if (evt.key === 'Enter') {
        activ.classList.remove('map--faded');
        formActiv.classList.remove('ad-form--disabled');
        window.disableEnableInputs(enable);
      }
    });
    mainPin.removeEventListener('click', function () {
    });
    mainPin.removeEventListener('keypress', function () {
    });

  };
  activationMap();
})();
