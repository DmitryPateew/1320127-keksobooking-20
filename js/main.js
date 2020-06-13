'use strict';

var CHARSFORRANDOM = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
var STARTTYPE = 1;
var FINISHTYPE = 4;
var EXEMPLEADRESS = '600, 350';
var COUNTCHARSFORTITLE = 5;
var STARTPRICE = 100;
var ENDPRICE = 300;
var MINROOMS = 1;
var MAXROOMS = 6;
var MINGUESTS = 1;
var MAXGUESTS = 20;
var FEATURES = 'wifi';
var COUNTCHARSFORDESCRIPTIOM = 50;
var PHOTOS = 'http://o0.github.io/assets/images/tokyo/hotel1.jpg';
var XLOCATIONSTART = 1;
var XLOCATONFINISH = 900;
var YLOCATIONSTART = 130;
var YLOCATIONFINSH = 630;
var AVATARFOLDER = 'img/avatars/user0';
var AVATAREXTENSION = '.png';
var LOCATIONIDINARRAY = 2;
var PINCOUNT = 8;
var ATTRIBUTESFORIMG = 'width:40px;  height=40px; draggable=false; alt=Метка объявления';
var STYLE = 'style';
var IMG = 'img';
var BUTTON = 'button';
var PX = 'px';

var randomChars = function (length) {
  var result = '';
  var characters = CHARSFORRANDOM;
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
  switch (getRandomInt(STARTTYPE, FINISHTYPE)) {
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
    title: randomChars(COUNTCHARSFORTITLE),
    address: EXEMPLEADRESS,
    price: getRandomInt(STARTPRICE, ENDPRICE),
    type: getType(),
    rooms: getRandomInt(MINROOMS, MAXROOMS),
    guests: getRandomInt(MINGUESTS, MAXGUESTS),
    checkin: getStartFinishDate(),
    checkout: getStartFinishDate(),
    features: FEATURES,
    description: randomChars(COUNTCHARSFORDESCRIPTIOM),
    photos: PHOTOS
  };
  return offer;
};

var createLocation = function () {
  var location = {
    x: getRandomInt(XLOCATIONSTART, XLOCATONFINISH),
    y: getRandomInt(YLOCATIONSTART, YLOCATIONFINSH)
  };
  return location;
};

var authorAvatar = function (id) {
  return AVATARFOLDER + id + AVATAREXTENSION;
};

var createKeksPin = function (id) {
  return [authorAvatar(id), createOffer(), createLocation()];
};

var data = [];

var createData = function () {
  for (var i = 0; i < PINCOUNT; i++) {
    data.push(createKeksPin(i));
  }
  return data;
};

createData();

var getX = function (id) {
  var x = data[id].map(function (location) {
    return location.x;
  });
  var k = x[LOCATIONIDINARRAY];
  return k;
};

var getY = function (id) {
  var y = data[id].map(function (location) {
    return location.y;
  });
  var k = y[LOCATIONIDINARRAY];
  return k;
};

var makeImgTeg = function (id) {
  id = id + 1;
  var img = document.createElement(IMG);
  img.setAttribute(STYLE, ATTRIBUTESFORIMG);
  img.srcset = authorAvatar(id);
  return img;
};

var createPinElement = function (id) {
  var element = document.createElement(BUTTON);
  element.classList.add('map__pin');
  element.style.left = getX(id) + PX;
  element.style.top = getY(id) + PX;
  element.appendChild(makeImgTeg(id));
  return element;
};

var pinList = document.querySelector('.map__pins');

var fragment = document.createDocumentFragment();
for (var i = 0; i < PINCOUNT; i++) {
  fragment.appendChild(createPinElement(i));
}

pinList.appendChild(fragment);
