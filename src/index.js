import './index.css';

import jacImage from './images/jyc.jpg';
import cloImage from './images/close.svg';
import delImage from './images/delete-icon.svg';
// import ki1Image from './images/kirill-pershin-1088404-unsplash.jpg';
// import ki2Image from './images/kirill-pershin-1404681-unsplash.jpg';
// import ki3Image from './images/kirill-pershin-1556355-unsplash.jpg';
import liaImage from './images/like_active.svg';
import lidImage from './images/like_disabled.svg';
import logImage from './images/logo.svg';
import pluImage from './images/plus.svg';
import slaImage from './images/slash.svg';

const whoIsTheGoat = [
  { name: 'jac', image: jacImage },
  { name: 'clo', image: cloImage },
  { name: 'del', image: delImage },
  // { name: 'ki1', image: ki1Image },
  // { name: 'ki2', image: ki2Image },
  // { name: 'ki3', image: ki3Image },
  { name: 'lia', image: liaImage },
  { name: 'lid', image: lidImage },
  { name: 'log', image: logImage },
  { name: 'plu', image: pluImage },
  { name: 'sla', image: slaImage },
];

// Jacques-Yves_Cousteau.jpg  kirill-pershin-1088404-unsplash.jpg  like_active.svg    plus.svg
// close.svg                  kirill-pershin-1404681-unsplash.jpg  like_disabled.svg  slash.svg
// delete-icon.svg            kirill-pershin-1556355-unsplash.jpg  logo.svg


import {openPopup, closePopup} from './components/modal.js'; 
import {enableValidation, resetInputErrors, setButtonActivity} from './components/validate.js';
import {createPlace, addPlace} from './components/place.js';

// popup events

const popups = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.popup__close-button');

popups.forEach((popup) => {
  popup.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup')) {closePopup(popup)}
  });
});

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

// profile events

const personalCard = document.querySelector('.personal-card');
const personalCardName = personalCard.querySelector('.personal-card__name');
const personalCardActivity = personalCard.querySelector('.personal-card__activity');
const personalCardEditButton = personalCard.querySelector('.personal-card__edit-button');

const popupProfile = document.querySelector('.popup_profile');
const popupFormProfile = popupProfile.querySelector('.popup__form_profile');
const inputName = popupFormProfile.querySelector('.popup__input_profile-name');
const inputActivity = popupFormProfile.querySelector('.popup__input_profile-activity');
const saveButtonProfile = popupFormProfile.querySelector('.popup__save-button_profile');

personalCardEditButton.addEventListener('click', function () {
  inputName.value = personalCardName.textContent;
  inputActivity.value = personalCardActivity.textContent;
  resetInputErrors(popupFormProfile);
  setButtonActivity(saveButtonProfile, true);
  openPopup(popupProfile);
});

popupFormProfile.addEventListener('submit', function (evt) {
  evt.preventDefault(evt);
  personalCardName.textContent = inputName.value;
  personalCardActivity.textContent = inputActivity.value;
  closePopup(popupProfile);
});

// places events

const addPlaceButton = document.querySelector('.profile__add-place-button');

const popupPlace = document.querySelector('.popup_place');
const popupFormPlace = popupPlace.querySelector('.popup__form_place');
const placeName = popupFormPlace.querySelector('.popup__input_place-name');
const placeUrl = popupFormPlace.querySelector('.popup__input_place-url');
const saveButtonPlace = popupFormPlace.querySelector('.popup__save-button_place');

addPlaceButton.addEventListener('click', () => openPopup(popupPlace));

popupFormPlace.addEventListener('submit', function (evt) {
  evt.preventDefault(evt);
  addPlace(createPlace(placeName.value, placeUrl.value));
  evt.target.reset();
  setButtonActivity(saveButtonPlace, false);
  closePopup(popupPlace);
});

// validation

const validitySelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type-error',
  errorClass: 'popup__input-error_visible'
};

enableValidation(validitySelectors);

// initialization

  const initialCardsPlaces = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

for (let i = 0; i < initialCardsPlaces.length; i++) {
  addPlace(createPlace(initialCardsPlaces[i].name, initialCardsPlaces[i].link));
}
