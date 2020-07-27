'use strict';
(function () {
  var START__MAIN__PIN__SHARP__END = '600px 434px';
  var disabled = true;

  window.disableEnableInputs = function (disableEnable) {
    var fildset = document.querySelectorAll('.ad-form__element');
    for (var i = 0; i < fildset.length; i++) {
      fildset[i].disabled = disableEnable;
    }
    var picture = document.querySelector('.ad-form-header');
    picture.disabled = disableEnable;
  };

  window.disableEnableInputs(disabled);

  var mainPin = document.querySelector('.map__pin--main');

  window.activationMap = function () {
    var selector = false;
    var activ = document.querySelector('.map');
    var formActiv = document.querySelector('.ad-form');
    activ.classList.remove('map--faded');
    formActiv.classList.remove('ad-form--disabled');
    var adressField = document.querySelector('#address');
    adressField.value = START__MAIN__PIN__SHARP__END;
    window.disableEnableInputs(selector);
    window.filter();
    window.sendForm();
    var indicator = document.querySelector('.map--faded');
    if (!indicator) {
      mainPin.removeEventListener('mousedown', window.activationMap);
      mainPin.removeEventListener('click', window.activationMap);
    }
  };

  mainPin.addEventListener('click', window.activationMap);
  mainPin.addEventListener('mousedown', window.activationMap);

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      window.activationMap();
    }
  });

})();
