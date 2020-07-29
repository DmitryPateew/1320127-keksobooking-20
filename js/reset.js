'use strict';
(function () {
  window.getSiteInStart = function () {
    var mainPin = document.querySelector('.map__pin--main');
    mainPin.addEventListener('click', window.activationMap);
    mainPin.addEventListener('mousedown', window.activationMap);

    var START_PRICE = '1000';
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
    var guests = document.querySelector('#capacity');
    guests.innerHTML = '';
    guests.appendChild(window.createOption('1', ' гостя'));
    var price = document.querySelector('#price');
    price.placeholder = START_PRICE;
    price.min = '1000';
    var form = document.querySelector('.ad-form');
    form.reset();
    var filter = document.querySelector('.map__filters');
    filter.reset();
    var position = document.querySelector('#address');
    position.value = '600px ' + '380px';
    mainPin.style.left = '570px';
    mainPin.style.top = '375px';
  };

  var reset = function () {
    var resetButton = document.querySelector('.ad-form__reset');
    resetButton.removeEventListener('click', window.getSiteInStart);
    resetButton.addEventListener('click', window.getSiteInStart);
    resetButton.addEventListener('keypress', function (evt) {
      if (evt.key === 'Enter') {
        window.getSiteInStart();
      }
    });
  };
  reset();
})();
