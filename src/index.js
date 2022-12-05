// НАСТРОЙКИ ДЛЯ WEBPACK

import './index.css';

//import jacImage from './images/jyc.jpg';
//
//const whoIsTheGoat = [
//  { name: 'jac', image: jacImage },
//];

import {openPopup, closePopup} from './components/modal.js';
import {enableValidation, resetInputErrors, toggleButtonState} from './components/validate.js';
import {createCard, addCardToDOM} from './components/card.js';
import {getProfile, patchProfile, patchAvatar, getCards, postCard} from './components/api.js';
import {setButtonTextContant} from './components/utils.js';

// initialization profile and cards

let profile = {};
let cardsArray = [];

Promise.all([getProfile(), getCards()])
.then(([userData, cardsData]) => {
  profile = userData;
  profileAvatar.src = profile.avatar;
  profileName.textContent = profile.name;
  profileActivity.textContent = profile.about;
  cardsArray = cardsData.map((item) => {
    const card = {
      name:     item.name,
      link:     item.link,
      owner_id: item.owner._id,
      card_id:  item._id,
      likes:    item.likes.map((it) => {
        return it._id
      })
    };
    return card;
  });
  cardsArray.forEach((card) => {
    addCardToDOM(createCard(card));
  })
})
.catch((res) => alert(`${res} - ошибка чтения данных с сервера`));

// initialization validation

const validitySettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_disabled',
  inputErrorClass: 'popup__input_type-error',
  errorClass: 'popup__input-error_visible'
};

enableValidation(validitySettings);

// popup close events

const popups = document.querySelectorAll('.popup');

popups.forEach((popup) => {
  popup.addEventListener('mousedown', function (evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__button-close')) {closePopup()}
  });
});

// profile events

const profileContainer = document.querySelector('.profile__container');
const profileAvatar = profileContainer.querySelector('.profile__avatar');
const profileName = profileContainer.querySelector('.profile__name');
const profileActivity = profileContainer.querySelector('.profile__activity');
const buttonEditProfile = profileContainer.querySelector('.profile__button-edit');

const popupEditingProfile = document.querySelector('.popup_editing-profile');
const formProfile = document.forms['form_profile'];
const inputName = formProfile.elements['profile-name'];
const inputActivity = formProfile.elements['profile-activity'];
const buttonSubmitProfile = formProfile.elements['button-submit_profile'];

buttonEditProfile.addEventListener('click', function () {
  inputName.value = profileName.textContent;
  inputActivity.value = profileActivity.textContent;
  resetInputErrors(formProfile, validitySettings);
  toggleButtonState([inputName, inputActivity], buttonSubmitProfile, validitySettings);
  openPopup(popupEditingProfile);
});

formProfile.addEventListener('submit', function (evt) {
  evt.preventDefault(evt);
  setButtonTextContant(buttonSubmitProfile, 'Сохранение...');
  patchProfile(inputName.value, inputActivity.value)
  .then((res) => {
    profileName.textContent = res.name;
    profileActivity.textContent = res.about;
    profile.name = res.name;
    profile.about = res.about;
  })
  .then(() =>{closePopup()})
  .catch((res) => alert(`${res} - ошибка записи профиля`))
  .finally(() => {
    setButtonTextContant(buttonSubmitProfile, 'Сохранить');
  })
});

// avatar events

const buttonEditAvatar = profileContainer.querySelector('.profile__button-avatar');

const popupEditingAvatar = document.querySelector('.popup_editing-avatar');
const formAvatar = document.forms['form_avatar'];
const inputAvatarUrl = formAvatar.elements['avatar-url'];
const buttonSubmitAvatar = formAvatar.elements['button-submit_avatar'];

buttonEditAvatar.addEventListener('click', function () {
  inputAvatarUrl.value = profileAvatar.src;
  resetInputErrors(formAvatar, validitySettings);
  toggleButtonState([inputAvatarUrl], buttonSubmitAvatar, validitySettings);
  openPopup(popupEditingAvatar);
});

formAvatar.addEventListener('submit', function (evt) {
  evt.preventDefault(evt);
  setButtonTextContant(buttonSubmitAvatar, 'Сохранение...');
  patchAvatar(`${inputAvatarUrl.value}`)
  .then((res) => {
    profileAvatar.src = res.avatar;
    profile.avatar = res.avatar;
  })
  .then(() =>{closePopup()})
  .catch((res) => alert(`${res} - ошибка записи url аватара`))
  .finally(() => {
    setButtonTextContant(buttonSubmitAvatar, 'Сохранить');
  })
});

// cards events

const buttonAddCard = document.querySelector('.profile__button-add-card');

const popupCreatingCard = document.querySelector('.popup_creating-card');
const formCard = document.forms['form_card'];
const cardName = formCard.elements['card-name'];
const cardUrl = formCard.elements['card-url'];
const buttonSubmitCard = formCard.elements['button-submit_card'];

toggleButtonState([cardName, cardUrl], buttonSubmitCard, validitySettings);

buttonAddCard.addEventListener('click', () => {openPopup(popupCreatingCard)});

formCard.addEventListener('reset', () => {
  setTimeout(() => {
    toggleButtonState ([cardName, cardUrl], buttonSubmitCard, validitySettings);
  }, 0);
});

formCard.addEventListener('submit', function (evt) {
  evt.preventDefault(evt);
  const cardItem = {name: cardName.value, link: cardUrl.value};
  setButtonTextContant(buttonSubmitCard, 'Сохранение...');
  postCard(cardItem)
  .then ((res) => {
    const newcard = {
      name:     res.name,
      link:     res.link,
      owner_id: res.owner._id,
      card_id:  res._id,
      likes:    res.likes.map((it) => {
        return it._id
      })
    };
    cardsArray.push(newcard);
    addCardToDOM(createCard(newcard));
    evt.target.reset();
  })
  .then(() =>{closePopup()})
  .catch((res) => alert(`${res} - ошибка записи карточки`))
  .finally(() => {
    setButtonTextContant(buttonSubmitCard, 'Создать');
  })
});

export {profile, cardsArray}
