'use strict';

(function () {
  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;

  var MIN_PRICE_FOR_BUNGALO = 0;
  var MIN_PRICE_FOR_FLAT = 1000;
  var MIN_PRICE_FOR_HOUSE = 5000;
  var MIN_PRICE_FOR_PALACE = 10000;

  var DEPEND_CHECK_OUT = 0;
  var DEPEND_CHECK_IN = 1;

  var titleValidation = function () {
    var title = document.querySelector('#title');

    title.addEventListener('invalid', function () {
      if (title.validity.valueMissing) {
        title.setCustomValidity('Обязательное поле');
      } else {
        title.setCustomValidity('');
      }
    });

    title.addEventListener('input', function () {
      var valueLength = title.value.length;

      if (valueLength < MIN_TITLE_LENGTH) {
        title.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
      } else if (valueLength > MAX_TITLE_LENGTH) {
        title.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + ' симв.');
      } else {
        title.setCustomValidity('');
      }
    });
  };

  titleValidation();

  var price = document.querySelector('#price');

  var priceListner = function (minValue) {
    price.addEventListener('oninput ', function () {
      var value = price.value;
      if (value < minValue) {
        price.setCustomValidity('Минимальная цена для данного типа помещения ' + minValue);
      } else {
        price.setCustomValidity('');

      }
    });
  };


  var priceValidation = function () {
    var type = document.querySelector('#type');
    type.addEventListener('change', function () {
      switch (type.value) {
        case 'bungalo':
          price.placeholder = MIN_PRICE_FOR_BUNGALO;
          price.min = MIN_PRICE_FOR_BUNGALO;
          priceListner(MIN_PRICE_FOR_BUNGALO);
          break;
        case 'flat':
          price.placeholder = MIN_PRICE_FOR_FLAT;
          price.min = MIN_PRICE_FOR_FLAT;
          priceListner(MIN_PRICE_FOR_FLAT);
          break;
        case 'house':
          price.placeholder = MIN_PRICE_FOR_HOUSE;
          price.min = MIN_PRICE_FOR_HOUSE;
          priceListner(MIN_PRICE_FOR_HOUSE);
          break;
        case 'palace':
          price.placeholder = MIN_PRICE_FOR_PALACE;
          price.min = MIN_PRICE_FOR_PALACE;
          priceListner(MIN_PRICE_FOR_PALACE);
          break;
        default:
          price.placeholder = MIN_PRICE_FOR_FLAT;
          price.min = MIN_PRICE_FOR_FLAT;
          priceListner(MIN_PRICE_FOR_FLAT);
          break;
      }
    });
  };

  priceValidation();

  var checkValidation = function (toogle) {
    var checkTn = document.querySelector('#timein');
    var checkOut = document.querySelector('#timeout');
    var check = 0;
    var dependedCheck = 0;

    if (toogle === 0) {
      check = checkTn;
      dependedCheck = checkOut;
    } else {
      check = checkOut;
      dependedCheck = checkTn;
    }

    check.addEventListener('change', function () {
      switch (check.value) {
        case '12:00':
          dependedCheck.options[0].selected = 'selected';
          break;
        case '13:00':
          dependedCheck.options[1].selected = 'selected';
          break;
        case '14:00':
          dependedCheck.options[2].selected = 'selected';
          break;
      }
    });
  };

  checkValidation(DEPEND_CHECK_OUT);
  checkValidation(DEPEND_CHECK_IN);

  window.createOption = function (value, guest) {
    var option = document.createElement('option');
    var forGuest = 'для ';
    if (guest === undefined) {
      guest = ' гостей';
    }
    option.value = value;
    option.innerText = forGuest + value + guest;

    if (value === '0') {
      option.innerText = 'не ' + forGuest + guest;
    }
    return option;
  };

  var countGuestsValidation = function () {
    var room = document.querySelector('#room_number');
    var guests = document.querySelector('#capacity');

    room.addEventListener('change', function () {
      switch (room.value) {
        case '1':
          guests.innerHTML = '';
          guests.appendChild(window.createOption('1', ' гостя'));
          break;
        case '2':
          guests.innerHTML = '';
          guests.appendChild(window.createOption('1', ' гостя'));
          guests.appendChild(window.createOption('2'));
          break;
        case '3':
          guests.innerHTML = '';
          guests.appendChild(window.createOption('1', ' гостя'));
          guests.appendChild(window.createOption('2'));
          guests.appendChild(window.createOption('3'));
          break;
        case '100':
          guests.innerHTML = '';
          guests.appendChild(window.createOption('0'));
          break;
      }
    });
  };

  countGuestsValidation();

})();
