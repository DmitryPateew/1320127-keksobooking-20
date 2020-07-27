'use strict';
(function () {
  window.sendForm = function () {
    var METHOD = 'POST';
    var URL = ' https://javascript.pages.academy/keksobooking';
    var notice = document.querySelector('.notice');

    var onSuccess = function () {
      window.getSiteInStart();
      var successPopupTemplate = document.querySelector('#success');
      var successPopup = successPopupTemplate.content.cloneNode(true);
      notice.appendChild(successPopup);
      var deletePopup = document.querySelector('.success');
      document.addEventListener('click', function () {
        deletePopup.remove();
      });

      document.addEventListener('keydown', function (evt) {
        if (evt.key === 'Escape') {
          evt.preventDefault();
          deletePopup.remove();
        }
      });
    };

    var onError = function () {
      var errorPopupTemplate = document.querySelector('#error');
      var errorPopup = errorPopupTemplate.content.cloneNode(true);
      notice.appendChild(errorPopup);
      var closeError = document.querySelector('.error__button');
      closeError.addEventListener('click', function () {
        var popup = document.querySelector('.error');
        if (popup) {
          popup.remove();
        }
      });
      closeError.addEventListener('keypress', function (evt) {
        if (evt.key === 'Enter') {
          var popup = document.querySelector('.error');
          if (popup) {
            popup.remove();
          }
        }
      });
      var divError = document.querySelector('.error');
      if (divError) {
        document.addEventListener('click', function (evt) {
          if (evt.target.className !== 'error__message' && evt.target.className !== 'error__button') {
            divError.remove();
          }
        });
      }
      if (divError) {
        document.addEventListener('keydown', function (evt) {
          if (evt.key === 'Escape') {
            evt.preventDefault();
            divError.remove();
          }
        });
      }
    };

    var submit = document.querySelector('.ad-form');
    submit.onsubmit = function (evt) {
      evt.preventDefault();
      var position = document.querySelector('#address');
      var formData = new FormData(submit);
      var avatar = document.querySelector('#avatar');
      var image = document.querySelector('#images');
      formData.append('address', position.value);
      formData.append('avatar', avatar.value);
      formData.append('images', image.value);
      window.serverCommunication(onSuccess, onError, URL, METHOD, formData);
    };
  };
})();
