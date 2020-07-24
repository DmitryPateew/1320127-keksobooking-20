'use strict';
(function () {
  window.renderCards = function (data, id) {
    var FLAT__TYPE__MAP = {
      flat: 'Квартира',
      bungalo: 'Бунгало',
      house: 'Дом',
      palace: 'Дворец'
    };

    var divPins = document.querySelector('.map__pins');
    var card = document.querySelector('#card');
    var clone = card.content.cloneNode(true);
    var img = clone.querySelector('.popup__avatar');


    var close = clone.querySelector('.popup__close');
    close.addEventListener('click', function () {
      var exectCard = document.querySelector('.popup');
      exectCard.remove();
    });

    close.addEventListener('keypress', function (evt) {
      if (evt.key === 'Enter') {
        var exectCard = document.querySelector('.popup');
        exectCard.remove();
      }
    });
    document.addEventListener('keypress', function (evt) {
      if (evt.key === 'Esc') {
        var exectCard = document.querySelector('.popup');
        exectCard.remove();
      }
    });
    document.removeEventListener('keypress', function () {
    });
    close.removeEventListener('click', function () {
    });
    close.removeEventListener('keypress', function () {
    });

    if (data[id].author.avatar) {
      img.src = data[id].author.avatar;
    } else {
      img.remove();
    }
    var title = clone.querySelector('.popup__title');
    if (data[id].offer.title) {
      title.textContent = data[id].offer.title;
    } else {
      title.hidden = true;
    }
    var textAddress = clone.querySelector('.popup__text--address');
    if (data[id].offer.address) {
      textAddress.textContent = data[id].offer.address;
    } else {
      textAddress.hidden = true;
    }
    var textPrice = clone.querySelector('.popup__text--price');
    if (data[id].offer.price) {
      textPrice.innerHTML = '&#x20bd;<span>/ночь</span>';
      textPrice.prepend(data[id].offer.price);
    } else {
      textPrice.hidden = true;
    }

    var type = clone.querySelector('.popup__type');
    if (data[id].offer.type) {
      type.textContent = FLAT__TYPE__MAP[data[id].offer.type];
    } else {
      type.hidden = true;
    }

    var capacity = clone.querySelector('.popup__text--capacity');
    if (data[id].offer.rooms && data[id].offer.guests) {
      capacity.textContent = data[id].offer.rooms + ' комнаты для ' + data[id].offer.guests + ' гостей';
    } else {
      capacity.hidden = true;
    }

    var time = clone.querySelector('.popup__text--time');
    if (data[id].offer.checkin && data[id].offer.checkout) {
      time.textContent = 'Заезд после ' + data[id].offer.checkin + ', выезд до ' + data[id].offer.checkout;
    } else {
      time.hidden = true;
    }

    var fragmentFeatures = document.createDocumentFragment();
    var features = clone.querySelector('.popup__features');
    features.innerHTML = '';

    if (data[id].offer.features) {
      for (var item = 0; item < data[id].offer.features.length; item++) {
        var feature = document.createElement('li');
        feature.classList.add('popup__feature', 'popup__feature--' + data[id].offer.features[item]);
        var newClone = feature.cloneNode();
        fragmentFeatures.appendChild(newClone);
        features.appendChild(fragmentFeatures);
      }
    } else {
      features.hidden = true;
    }

    var description = clone.querySelector('.popup__description');
    if (data[id].offer.description) {
      description.textContent = data[id].offer.description;
    } else {
      description.hidden = true;
    }


    var fragment = document.createDocumentFragment();

    var photos = clone.querySelector('.popup__photos');
    var photo = clone.querySelector('.popup__photo');

    if (data[id].offer.photos !== []) {
      for (var iter = 0; iter < data[id].offer.photos.length; iter++) {
        photo.src = data[id].offer.photos[iter];
        var newClonePhoto = photo.cloneNode();
        fragment.appendChild(newClonePhoto);
        photos.appendChild(fragment);
      }
    } else {
      photos.remove();
    }

    divPins.parentNode.appendChild(clone);
  };
})();
