// НАСТРОЙКИ ДЛЯ WEBPACK

// import './index.css';

//import jacImage from './images/jyc.jpg';
//import cloImage from './images/close.svg';
//import delImage from './images/delete-icon.svg';
//import liaImage from './images/like_active.svg';
//import lidImage from './images/like_disabled.svg';
//import logImage from './images/logo.svg';
//import pluImage from './images/plus.svg';
//import slaImage from './images/slash.svg';

//const whoIsTheGoat = [
  //{ name: 'jac', image: jacImage },
  //{ name: 'clo', image: cloImage },
  //{ name: 'del', image: delImage },
  //{ name: 'lia', image: liaImage },
  //{ name: 'lid', image: lidImage },
  //{ name: 'log', image: logImage },
  //{ name: 'plu', image: pluImage },
  //{ name: 'sla', image: slaImage },
//];

import {openPopup, closePopup} from './components/modal.js';
import {enableValidation, resetInputErrors, setButtonActivity} from './components/validate.js';
import {createCard, addCardToDOM} from './components/card.js';
import {getProfile, patchProfile, patchAvatar, getCards, postCard} from './components/api.js';
import {setButtonTextContant} from './components/utils.js';

// popup events

const popups = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.popup__button-close');

popups.forEach((popup) => {
  popup.addEventListener('mousedown', function (evt) {
    if (evt.target.classList.contains('popup')) {closePopup()}
  });
});

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup());
});

// profile events

const profileContainer = document.querySelector('.profile__container');
const profileAvatar = profileContainer.querySelector('.profile__avatar');
const profileName = profileContainer.querySelector('.profile__name');
const profileActivity = profileContainer.querySelector('.profile__activity');
const buttonEditProfile = profileContainer.querySelector('.profile__button-edit');

const popupEditingProfile = document.querySelector('.popup_editing-profile');
const formProfile = popupEditingProfile.querySelector('.popup__form_profile');
const inputName = formProfile.querySelector('.popup__input_profile-name');
const inputActivity = formProfile.querySelector('.popup__input_profile-activity');
const buttonSubmitProfile = formProfile.querySelector('.popup__button-submit_profile');

buttonEditProfile.addEventListener('click', function () {
  inputName.value = profileName.textContent;
  inputActivity.value = profileActivity.textContent;
  resetInputErrors(formProfile, validitySettings);
  setButtonTextContant(buttonSubmitProfile, 'Сохранить');
  setButtonActivity(buttonSubmitProfile, true, validitySettings);
  openPopup(popupEditingProfile);
});

formProfile.addEventListener('submit', function (evt) {
  evt.preventDefault(evt);
  if ((inputName.value != profile.name) || (inputActivity.value != profile.about)) {
    setButtonTextContant(buttonSubmitProfile, 'Сохранение...');
    patchProfile(inputName.value, inputActivity.value)
    .then((res) => {
      profileName.textContent = res.name;
      profileActivity.textContent = res.about;
      profile.name = res.name;
      profile.about = res.about;
    })
    .catch(() => {
      alert('УПС... ОШИБКА ОБНОВЛЕНИЯ ПРОФИЛЯ');
    })
  .finally(() => {
      closePopup();
    })
  } else {
    closePopup();
  }
});

// cards events

const buttonAddCard = document.querySelector('.profile__button-add-card');

const popupCreatingCard = document.querySelector('.popup_creating-card');
const formCard = popupCreatingCard.querySelector('.popup__form_card');
const cardName = formCard.querySelector('.popup__input_card-name');
const cardUrl = formCard.querySelector('.popup__input_card-url');
const buttonSubmitCard = formCard.querySelector('.popup__button-submit_card');

buttonAddCard.addEventListener('click', () => {
  setButtonTextContant(buttonSubmitCard, 'Создать');
  openPopup(popupCreatingCard);
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
    setButtonActivity(buttonSubmitCard, false, validitySettings);
  })
  .catch (() => {
    alert('УПС... ОШИБКА ДОБАВЛЕНИЯ КАРТОЧКИ');
  })
  .finally(() => {
    closePopup();
  })
});

// avatar events

const buttonEditAvatar = profileContainer.querySelector('.profile__button-avatar');

const popupEditingAvatar = document.querySelector('.popup_editing-avatar');
const formAvatar = popupEditingAvatar.querySelector('.popup__form_avatar');
const inputAvatarUrl = popupEditingAvatar.querySelector('.popup__input_avatar-url');
const buttonSubmitAvatar = popupEditingAvatar.querySelector('.popup__button-submit_avatar');

buttonEditAvatar.addEventListener('click', function () {
  inputAvatarUrl.value = profileAvatar.src;
  resetInputErrors(formAvatar, validitySettings);
  setButtonTextContant(buttonSubmitAvatar, 'Сохранить');
  setButtonActivity(buttonSubmitAvatar, true, validitySettings);
  openPopup(popupEditingAvatar);
});

formAvatar.addEventListener('submit', function (evt) {
  evt.preventDefault(evt);
  if (inputAvatarUrl.value != profile.avatar) {
    setButtonTextContant(buttonSubmitAvatar, 'Сохранение...');
    patchAvatar(`${inputAvatarUrl.value}`)
    .then((res) => {
      profileAvatar.src = res.avatar;
      profile.avatar = res.avatar;
    })
    .catch((res) => {
      alert(`УПС... Проверьте корректность ссылки: ${inputAvatarUrl.value}`);
    })
    .finally(() => {
      closePopup();
    })
  } else {
    closePopup();
  }
});

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

// initialization profile

let profile = {};

getProfile()
.then ((res) => {
  profile = res;
  return profile;
})
.catch (() => {
  profile = {
    about:  'Исследователь океана',
    avatar: './images/jyc.jpg',
    cohort: 'wbf-cohort-3',
    name:   'Жак-Ив Кусто',
    _id:    ''
  };
  alert('УПС... ОШИБКА ИНИЦИАЛИЗАЦИИ ПРОФИЛЯ');
  return profile;
})
.finally(() => {
  profileAvatar.src = profile.avatar;
  profileName.textContent = profile.name;
  profileActivity.textContent = profile.about;
})

// initialization cards

let cardsArray = [];

getCards()
.then ((res) => {
  cardsArray = res.map((item) => {
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
.catch(() => {
  alert('УПС... ОШИБКА ИНИЦИАЛИЗАЦИИ КАРТОТЕКИ');
})

export {profile, cardsArray}

//about:  "Студент"
//avatar: "https://burst.shopifycdn.com/photos/cute-curious-cat.jpg?width=925&format=pjpg&exif=1&iptc=1"
//cohort: "wbf-cohort-3"
//name:   "Мечтатель"
//_id:    "77980b944a1e3bef00434068"

//createdAt:  "2022-12-01T10:07:22.457Z"
//likes:      []
//link: "https://..."
//name:       "Горы"
//owner:
//  about:  "Студент"
//  avatar: "https://burst.shopifycdn.com/photos/cute-curious-cat.jpg?width=925&format=pjpg&exif=1&iptc=1"
//  cohort: "wbf-cohort-3"
//  name:   "Мечтатель"
//  _id:    "77980b944a1e3bef00434068"
//_id:        "63887cda7bbd671a241a32d1"
