'use strict';
(function () {
  window.sendForm = function () {
    var method = 'POST';
    var url = ' https://javascript.pages.academy/keksobooking';
    var notice = document.querySelector('.notice');

    var onSuccess = function () {
      var successPopupTemplate = document.querySelector('#success');
      var successPopup = successPopupTemplate.content.cloneNode(true);
      notice.appendChild(successPopup);
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
      closeError.removeEventListener('click', function () {
      });
      closeError.removeEventListener('keypress', function () {
      });
    };

    var submit = document.querySelector('.ad-form__submit');
    submit.addEventListener('click', function (evt) {
      evt.preventDefault();
      var formElement = document.querySelector('form');
      window.serverCommunication(onSuccess, onError, url, method, formElement);
    });
  };
})();
