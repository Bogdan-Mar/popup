'use strict';

const popupLinks = document.querySelectorAll('.popup_link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock_padding'); // клас у фіксованих по ширині контейнерів

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
  popupLinks.forEach(function (elem) {
    elem.addEventListener('click', function (event) {
      event = event || window.event;
      event.preventDefault();

      const popupName = elem.getAttribute('href').replace('#', '');
      const curentPopup = document.getElementById(popupName);
      popupOpen(curentPopup);
    });
  });
}

const popupCloseBtn = document.querySelectorAll('.popup_close');
if (popupCloseBtn.length > 0) {
  popupCloseBtn.forEach(function (elem) {
    elem.addEventListener('click', function () {
      popupClose(elem.closest('.popup'));
    });
  });
}

function popupOpen(curentPopup) {
  if (curentPopup && unlock) {
    const popupActive = document.querySelector('.popup.open');
    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }
    curentPopup.classList.add('open');
    curentPopup.addEventListener('click', function (event) {
      event = event || window.event;

      if (!event.target.closest('.popup_content')) {
        popupClose(event.target.closest('.popup'));
      }
    });
  }
}

function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove('open');
    if (doUnlock) {
      bodyUnLock();
    }
  }
}

function bodyLock() {
  const lockPaddingValue =
    window.innerWidth - document.querySelector('.wrap').offsetWidth + 'px';

  if (lockPadding.length > 0) {
    lockPadding.forEach(function (elem) {
      elem.style.paddingRight = lockPaddingValue;
    });
  }

  body.style.paddingRight = lockPaddingValue;
  body.classList.add('lock');

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

function bodyUnLock() {
  setTimeout(function () {
    if (lockPadding.length > 0) {
      lockPadding.forEach(function (elem) {
        elem.style.paddingRight = '0px';
      });
    }

    body.style.paddingRight = '0px';
    body.classList.remove('lock');
  }, timeout);

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

document.addEventListener('keydown', function (event) {
  event = event || window.event;

  if (event.which === 27) {
    const popupActive = document.querySelector('.popup.open');
    popupClose(popupActive);
  }
});

(function () {
  //перевіряємо підтримку
  if (!Element.prototype.closest) {
    //реалізуємо
    Element.prototype.closest = function (css) {
      var node = this;
      while (node) {
        if (node.matches(css)) return node;
        else node = node.parentElement;
      }
      return null;
    };
  }
})();

(function () {
  //перевіряємо підтримку
  if (!Element.prototype.matches) {
    //визначаємо властивість
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector;
  }
})();
