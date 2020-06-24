'use strict';


var CHARS_FOR_RANDOM = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
var START_TYPE = 1;
var FINISH_TYPE = 4;
var EXAMPLE_ADDRESS = '600, 350';
var COUNT_CHARS_FOR_TITLE = 5;
var START_PRICE = 100;
var END_PRICE = 300;
var MIN_ROOMS = 1;
var MAX_ROOMS = 6;
var MIN_GUESTS = 1;
var MAX_GUESTS = 20;
var FEATURES = 'wifi';
var COUNT_CHARS_FOR_DESCRIPTIOM = 50;
var PHOTOS = 'http://o0.github.io/assets/images/tokyo/hotel1.jpg';
var X_LOCATION_START = 1;
var X_LOCATION_FINISH = 900;
var Y_LOCATION_START = 130;
var Y_LOCATION_FINSH = 630;
var AVATAR_FOLDER = 'img/avatars/user0';
var AVATAR_EXTENSION = '.png';
var PIN_COUNT = 8;
var ATTRIBUTES_FOR_IMG = 'width:40px;  height=40px; draggable=false; alt=Метка объявления';
var STYLE = 'style';
var IMG = 'img';
var BUTTON = 'button';
var PX = 'px';

var randomChars = function (length) {
  var result = '';
  var characters = CHARS_FOR_RANDOM;
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var getType = function () {
  var type;
  switch (getRandomInt(START_TYPE, FINISH_TYPE)) {

    case 1:
      type = 'palace';
      break;
    case 2:
      type = 'flat';
      break;
    case 3:
      type = 'house';
      break;
    case 4:
      type = 'bungalo';
      break;
  }
  return type;
};

var getStartFinishDate = function () {
  var date;
  switch (getRandomInt(1, 3)) {
    case 1:
      date = '12:00';
      break;
    case 2:
      date = '13:00';
      break;
    case 3:
      date = '14.00';
  }
  return date;
};

var createOffer = function () {
  var offer = {
    title: randomChars(COUNT_CHARS_FOR_TITLE),
    address: EXAMPLE_ADDRESS,
    price: getRandomInt(START_PRICE, END_PRICE),
    type: getType(),
    rooms: getRandomInt(MIN_ROOMS, MAX_ROOMS),
    guests: getRandomInt(MIN_GUESTS, MAX_GUESTS),
    checkin: getStartFinishDate(),
    checkout: getStartFinishDate(),
    features: FEATURES,
    description: randomChars(COUNT_CHARS_FOR_DESCRIPTIOM),
    photos: PHOTOS
  };
  return offer;
};

var createLocation = function () {
  var location = {
    x: getRandomInt(X_LOCATION_START, X_LOCATION_FINISH),
    y: getRandomInt(Y_LOCATION_START, Y_LOCATION_FINSH)
  };
  return location;
};

var authorAvatar = function (id) {
  return AVATAR_FOLDER + id + AVATAR_EXTENSION;
};

var createKeksPin = function (id) {
  var pin = {
    author: authorAvatar(id),
    offer: createOffer(),
    location: createLocation()
  };
  return pin;
};

var data = [];

var createData = function () {
  for (var i = 0; i < PIN_COUNT; i++) {
    data.push(createKeksPin(i));
  }
  return data;
};

createData();

var makeImgTeg = function (id) {
  id = id + 1;
  var img = document.createElement(IMG);

  img.setAttribute(STYLE, ATTRIBUTES_FOR_IMG);

  img.srcset = authorAvatar(id);
  return img;
};

var createPinElement = function (id) {
  var element = document.createElement(BUTTON);
  element.classList.add('map__pin');
  element.style.left = data[id].location.x + PX;
  element.style.top = data[id].location.y + PX;
  element.appendChild(makeImgTeg(id));
  return element;
};

var pinList = document.querySelector('.map__pins');

var fragment = document.createDocumentFragment();

for (var i = 0; i < PIN_COUNT; i++) {
  fragment.appendChild(createPinElement(i));
}

pinList.appendChild(fragment);

var disable = true;

var disableEnableInputs = function (disableEnable) {
  var fildset = document.querySelectorAll('.ad-form__element');
  for (i = 0; i < fildset.length; i++) {
    fildset[i].disabled = disableEnable;
  }
  var picture = document.querySelector('.ad-form-header');
  picture.disabled = disableEnable;
};

disableEnableInputs(disable);

var mainPin = document.querySelector('.map__pin--main');

var getCoords = function (elem) {
  var box = elem.getBoundingClientRect();
  var coords = box.top + pageYOffset + ' координата X= ' + box.left + pageXOffset;
  return coords;
};

var insertCoords = function () {
  var adressField = document.querySelector('#address');
  adressField.disabled = true;
  adressField.value = getCoords(mainPin);
};

insertCoords();

var activationMap = function () {
  var enable = false;
  var activ = document.querySelector('.map');
  var formActiv = document.querySelector('.ad-form');

  mainPin.addEventListener('click', function () {
    activ.classList.remove('map--faded');
    formActiv.classList.remove('ad-form--disabled');
    disableEnableInputs(enable);
  });
  mainPin.addEventListener('keypress', function (evt) {
    if (evt.key === 'Enter') {
      activ.classList.remove('map--faded');
      formActiv.classList.remove('ad-form--disabled');
      disableEnableInputs(enable);
    }
  });
  mainPin.removeEventListener('click', function () {
  });
  mainPin.removeEventListener('keypress', function () {
  });

};

activationMap();


