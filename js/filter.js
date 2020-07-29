'use strict';
(function () {
  window.filter = function () {
    var PIN_COUNT = 5;
    var URL = 'https://javascript.pages.academy/keksobooking/data';
    var METHOD = 'GET';
    var ANY = 'any';

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

    var houseFilter = function (dataServer) {
      var houseType = document.querySelector('#housing-type');
      var nowTypeHouse = ANY;
      if (nowTypeHouse === ANY) {
        housingPriceFilter(dataServer);
      }
      houseType.addEventListener('change', function () {
        window.deletePopup();
        nowTypeHouse = houseType.value;
        var filtredData = [];
        window.deletePins();
        if (nowTypeHouse === ANY) {
          filtredData = dataServer;
          housingPriceFilter(filtredData);
        } else {
          for (var house = 0; filtredData.length < PIN_COUNT && house < dataServer.length; house++) {
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
            for (var t = 0; filtredData.length < PIN_COUNT && t < dataServer.length; t++) {
              if (dataServer[t].offer.price >= 10000 && dataServer[t].offer.price < 50000) {
                filtredData.push(dataServer[t]);
              }
            }
            break;
          case 'low':
            for (var p = 0; filtredData.length < PIN_COUNT && p < dataServer.length; p++) {
              if (dataServer[p].offer.price < 10000) {
                filtredData.push(dataServer[p]);
              }
            }
            break;
          case 'high':
            for (var n = 0; filtredData.length < PIN_COUNT && n < dataServer.length; n++) {
              if (dataServer[n].offer.price > 10000) {
                filtredData.push(dataServer[n]);
              }
            }
        }
        housingRoomFilter(filtredData);
      }
    };
    var price = document.querySelector('#housing-price');


    var housingPriceFilter = function (dataServer) {
      var nowPriceRange = price.value;
      if (nowPriceRange === ANY) {
        housingRoomFilter(dataServer);
      } else {
        comparePrice(dataServer, nowPriceRange);
      }
      price.addEventListener('change', function () {
        window.deletePopup();
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
        for (var n = 0; filtredData.length < PIN_COUNT && n < dataServer.length; n++) {
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
        window.deletePopup();
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
        window.deletePopup();
        countGuest = guest.value;
        compareGuests(dataServer, countGuest);
      });
    };

    var compareFeatures = function (dataServer, chekedFeatures) {
      var result = dataServer.filter(function (element) {
        var el;
        var valid = true;
        for (var n = 0; n < chekedFeatures.length; n++) {
          if (!element.offer.features.includes(chekedFeatures[n])) {
            valid = false;
          }
          if (valid) {
            el = element;
          } else {
            el = '';
          }
        }
        return el;
      });
      window.debounce(window.renderData(result));
    };

    var addFeatures = function (features) {
      var chekedFeatures = [];
      var listFeatures = features.querySelectorAll('.map__checkbox ');
      window.deletePopup();
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
        window.debounce(window.renderData(dataServer));
      }
      features.addEventListener('click', function () {
        window.deletePins();
        newFeatures = addFeatures(features);
        if (newFeatures.length === 0) {
          window.debounce(window.renderData(dataServer));
        }
        compareFeatures(dataServer, newFeatures);
      });
      compareFeatures(dataServer, newFeatures);
    };


    var onSuccess = function (dataServer) {
      houseFilter(dataServer);
    };

    window.removeActivPin = function () {
      var button = document.querySelector('.map__pin--active');
      if (button) {
        button.classList.remove('map__pin--active');
      }
    };

    window.deletePopup = function () {
      window.removeActivPin();
      var popup = document.querySelector('.popup');
      if (popup) {
        popup.remove();
      }
    };
    window.serverCommunication(onSuccess, onError, URL, METHOD);
  };
})();
