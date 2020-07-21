'use strict';
(function () {
  window.filter = function () {
    var PIN_COUNT = 5;
    var PX = 'px';
    var url = 'https://javascript.pages.academy/keksobooking/data';
    var method = 'GET';

    var onError = function (message) {
      var errors = [];
      errors.push(message);
    };

    var renderData = function (dataServer) {
      for (var i = 0; i < PIN_COUNT; i++) {
        fragment.appendChild(createPinElement(dataServer, i));
      }
      pinList.appendChild(fragment);
    };

    var onSuccess = function (dataServer) {
      renderData(dataServer);
    };

    var deletePopup = function () {
      var allCards = document.querySelectorAll('.popup');
      for (var item = 0; item < allCards.length; item++) {
        allCards[item].remove();
      }
    };

    var createPinElement = function (data, id) {
      var pin = document.querySelector('#pin');
      var pinClone = pin.content.cloneNode(true);
      var button = pinClone.querySelector('.map__pin');
      if (data[id].offer) {
        button.style.left = data[id].location.x + PX;
        button.style.top = data[id].location.y + PX;
        var img = pinClone.querySelector('img');
        img.src = data[id].author.avatar;
        button.addEventListener('click', function () {
          deletePopup();
          window.renderCards(data, id);
        });
      }
      return pinClone;
    };

    var pinList = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();

    window.serverCommunication(onSuccess, onError, url, method);

  };
})();
