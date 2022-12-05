function escClosePopup (evt) {
  if (evt.key === 'Escape') {
    closePopup();
    evt.target.blur();
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  setTimeout(function() {
    popup.classList.remove('popup_disappearance');
    popup.classList.add('popup_appearance');
  }, 100);
  document.addEventListener('keydown', escClosePopup)
}

function closePopup() {
  const popup = document.querySelector('.popup_opened');
  popup.classList.remove('popup_appearance');
  popup.classList.add('popup_disappearance');
  setTimeout(() => {popup.classList.remove('popup_opened')}, 700);
  document.removeEventListener('keydown', escClosePopup)
}

export {openPopup, closePopup};
