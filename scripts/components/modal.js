let activePopup;

function escClosePopup (evt) {
  if (evt.key === 'Escape') {
    closePopup(activePopup);
    evt.target.blur();
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  setTimeout(function() {
    popup.classList.remove('popup_disappearance');
    popup.classList.add('popup_appearance');
  }, 100);
  activePopup = popup;
  document.addEventListener('keydown', escClosePopup)
}

function closePopup(popup) {
  activePopup = undefined;
  popup.classList.remove('popup_appearance');
  popup.classList.add('popup_disappearance');
  setTimeout(function() {
    popup.classList.remove('popup_opened');
  }, 800);
  document.removeEventListener('keydown', escClosePopup)
}

export {openPopup, closePopup};
