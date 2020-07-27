'use strict';
(function () {
  var LEFT__SHIFT = 25;
  var TOP__SHIFT = 70;
  var PIN_COUNT = 5;
  var PX = 'px';

  window.renderData = function (dataServer) {
    var quantity;
    if (dataServer.length < PIN_COUNT) {
      quantity = dataServer.length;
    } else {
      quantity = PIN_COUNT;
    }
    for (var i = 0; i < quantity; i++) {
      if (dataServer[i].offer) {
        fragment.appendChild(createPinElement(dataServer, i));
      }
    }
    pinList.appendChild(fragment);
  };


  var createPinElement = function (data, id) {
    var pin = document.querySelector('#pin');
    var pinClone = pin.content.cloneNode(true);
    var button = pinClone.querySelector('.map__pin');
    button.style.left = data[id].location.x - LEFT__SHIFT + PX;
    button.style.top = data[id].location.y - TOP__SHIFT + PX;
    var img = pinClone.querySelector('img');
    img.src = data[id].author.avatar;
    button.addEventListener('click', function () {
      window.deletePopup();
      button.classList.add('map__pin--active');
      window.renderCards(data, id, button);
    });
    return pinClone;
  };

  var pinList = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

})();
