'use strict';
(function () {
  window.filter = function () {
    var PIN_COUNT = 5;
    var PX = 'px';
    var url = 'https://javascript.pages.academy/keksobooking/data';
    var method = 'GET';
    var ANY = 'any';
    var LEFT__SHIFT = 25;
    var TOP__SHIFT = 70;

    var onError = function (message) {
      var errors = [];
      errors.push(message);
    };
    window.deletePins = function () {
      var allPins = document.querySelectorAll('.map__pin');
      for (var pin = 1; pin < allPins.length; pin++) {
        allPins[pin].remove();
      }
    };
    var renderData = function (dataServer) {
      var iter;
      if (dataServer.length < PIN_COUNT) {
        iter = dataServer.length;
      } else {
        iter = PIN_COUNT;
      }
      for (var i = 0; i < iter; i++) {
        fragment.appendChild(createPinElement(dataServer, i));
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
        deletePopup();
        window.renderCards(data, id);
      });

      return pinClone;
    };

    var pinList = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();


    var houseFilter = function (dataServer) {
      var houseType = document.querySelector('#housing-type');
      var nowTypeHouse = ANY;
      if (nowTypeHouse === ANY) {
        housingPriceFilter(dataServer);
      }
      houseType.addEventListener('change', function () {
        deletePopup();
        nowTypeHouse = houseType.value;
        var filtredData = [];
        window.deletePins();
        if (nowTypeHouse === ANY) {
          filtredData = dataServer;
          housingPriceFilter(filtredData);
        } else {
          for (var house = 0; house < dataServer.length; house++) {
            var dataTypeHouse = dataServer[house].offer.type;
            if (nowTypeHouse === dataTypeHouse) {
              filtredData.push(dataServer[house]);
            }
          }
          housingPriceFilter(filtredData);
        }
      });
    };


    var comparePrice = function (dataServer, compareValue) {
      var filtredData = [];
      window.deletePins();
      if (compareValue === ANY) {
        filtredData = dataServer;
        housingRoomFilter(filtredData);
      } else {
        switch (compareValue) {
          case 'middle':
            for (var i = 0; i < dataServer.length; i++) {
              if (dataServer[i].offer.price >= 10000 && dataServer[i].offer.price < 50000) {
                filtredData.push(dataServer[i]);
              }
            }
            break;
          case 'low':
            for (i = 0; i < dataServer.length; i++) {
              if (dataServer[i].offer.price < 10000) {
                filtredData.push(dataServer[i]);
              }
            }
            break;
          case 'high':
            for (i = 0; i < dataServer.length; i++) {
              if (dataServer[i].offer.price > 10000) {
                filtredData.push(dataServer[i]);
              }
            }
        }
        housingRoomFilter(filtredData);
      }
    };


    var housingPriceFilter = function (dataServer) {
      var price = document.querySelector('#housing-price');
      var nowPriceRange = price.value;
      if (nowPriceRange === ANY) {
        housingRoomFilter(dataServer);
      } else {
        comparePrice(dataServer, nowPriceRange);
      }
      price.addEventListener('change', function () {
        deletePopup();
        nowPriceRange = price.value;
        comparePrice(dataServer, nowPriceRange);
      });
    };

    var compareRooms = function (dataServer, compareValue) {
      var filtredData = [];
      window.deletePins();
      if (compareValue === ANY) {
        filtredData = dataServer;
        housingGuestsFilter(filtredData);
      } else {
        for (var n = 0; n < dataServer.length; n++) {
          var countRooms = dataServer[n].offer.rooms + '';
          if (compareValue === countRooms) {
            filtredData.push(dataServer[n]);
          }
        }
        housingGuestsFilter(filtredData);
      }
    };

    var housingRoomFilter = function (dataServer) {
      var room = document.querySelector('#housing-rooms');
      var countRoom = room.value;
      if (countRoom === ANY) {
        housingGuestsFilter(dataServer);
      } else {
        compareRooms(dataServer, countRoom);
      }
      room.addEventListener('change', function () {
        deletePopup();
        countRoom = room.value;
        compareRooms(dataServer, countRoom);
      });
    };

    var compareGuests = function (dataServer, compareValue) {
      var filtredData = [];
      window.deletePins();
      if (compareValue === ANY) {
        housingFeatures(dataServer);
      } else {
        for (var n = 0; n < dataServer.length; n++) {
          var countGuest = dataServer[n].offer.guests + '';
          if (compareValue === countGuest) {
            filtredData.push(dataServer[n]);
          }
        }
        housingFeatures(filtredData);
      }
    };

    var housingGuestsFilter = function (dataServer) {
      var guest = document.querySelector('#housing-guests');
      var countGuest = guest.value;
      if (countGuest === ANY) {
        housingFeatures(dataServer);
      } else {
        compareGuests(dataServer, countGuest);
      }
      guest.addEventListener('change', function () {
        deletePopup();
        countGuest = guest.value;
        compareGuests(dataServer, countGuest);
      });
    };


    var compareFeatures = function (dataServer, chekedFeatures) {
      var result = [];
      for (var p = 0; p < dataServer.length; p++) {
        var valid = true;
        for (var n = 0; n < chekedFeatures.length; n++) {
          if (!dataServer[p].offer.features.includes(chekedFeatures[n])) {
            valid = false;
          }
        }
        if (valid) {
          result.push(dataServer[p]);
        }
      }
      window.debounce(renderData(result));
    };

    var addFeatures = function (features) {
      var chekedFeatures = [];
      var listFeatures = features.querySelectorAll('.map__checkbox ');
      for (var i = 0; i < listFeatures.length; i++) {
        if (listFeatures[i].checked) {
          chekedFeatures.push(listFeatures[i].value);
        }
      }
      return chekedFeatures;
    };

    var housingFeatures = function (dataServer) {
      var features = document.querySelector('#housing-features');
      var newFeatures = addFeatures(features);
      if (newFeatures.length === 0) {
        window.debounce(renderData(dataServer));
      }
      features.addEventListener('click', function () {
        window.deletePins();
        newFeatures = addFeatures(features);
        if (newFeatures.length === 0) {
          window.debounce(renderData(dataServer));
        }
        compareFeatures(dataServer, newFeatures);
      });
    };


    var onSuccess = function (dataServer) {
      houseFilter(dataServer);
    };


    var deletePopup = function () {
      var allCards = document.querySelectorAll('.popup');
      for (var item = 0; item < allCards.length; item++) {
        allCards[item].remove();
      }
    };
    window.serverCommunication(onSuccess, onError, url, method);
  };
})();
