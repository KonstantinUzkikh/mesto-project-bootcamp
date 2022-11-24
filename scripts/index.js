// popup events

const popups = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.popup__close-button');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.classList.toggle('popup_disappearance');
  popup.classList.toggle('popup_appearance');
}

function closePopup(popup) {
  popup.classList.toggle('popup_appearance');
  popup.classList.toggle('popup_disappearance');
  popup.classList.remove('popup_opened');
}

popups.forEach((popup) => {
  popup.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup')) {closePopup(popup)}
  });
  //popup.addEventListener('keydown', function (evt) {
  //  if (evt.key = 'Escape') {closePopup(popup)}
  //});
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

const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupFormEditProfile = popupEditProfile.querySelector('.popup__form_edit-profile');
const inputName = document.querySelector('.popup__input_edit-profile-name');
const inputActivity = document.querySelector('.popup__input_edit-profile-activity');

personalCardEditButton.addEventListener('click', function () {
  inputName.value = personalCardName.textContent;
  inputActivity.value = personalCardActivity.textContent;
  openPopup(popupEditProfile);
});

popupFormEditProfile.addEventListener('submit', function (evt) {
  evt.preventDefault(evt);
  personalCardName.textContent = inputName.value;
  personalCardActivity.textContent = inputActivity.value;
  closePopup(popupEditProfile);
});

// places events

const profileAddNewPlaceButton = document.querySelector('.profile__add-new-place-button');

const placeTemplate = document.querySelector('#place-template').content;
const elementsPlacesLists = document.querySelector('.elements__places-list');

const popupNewPlace = document.querySelector('.popup_new-place');
const popupFormNewPlace = popupNewPlace.querySelector('.popup__form_new-place');
const placeName = document.querySelector('.popup__input_new-place-name');
const placeUrl = document.querySelector('.popup__input_new-place-url');

const popupIncreasedImage = document.querySelector('.popup_increased-image');

const popupCloseButtonBigImage = popupIncreasedImage.querySelector('.popup__close-button_big-image');
const popupBigImage = popupIncreasedImage.querySelector('.popup__big-image');
const popupTitleBigImage = popupIncreasedImage.querySelector('.popup__title-big-image');

function openBigImage (name, url) {
  popupTitleBigImage.textContent = name;
  popupBigImage.src = url;
  popupBigImage.alt='Фотография: ' + name;
  openPopup(popupIncreasedImage);
}

function createPlace (name, url) {
  const placeItem = placeTemplate.querySelector('.elements__place-item').cloneNode(true);
  const placeImage = placeItem.querySelector('.place__image');
  const placeTitle = placeItem.querySelector('.place__title');
  const placeLikeButton = placeItem.querySelector('.place__like-button');
  const placeDeleteButton = placeItem.querySelector('.place__delete-button');
  const placeImageButton = placeItem.querySelector('.place__image-button');
  placeTitle.textContent = name;
  placeImage.src = url;
  placeImage.alt='Фотография: ' + name;
  placeLikeButton.addEventListener('click', () => placeLikeButton.classList.toggle('place__like-button_active'));
  placeDeleteButton.addEventListener('click', () => placeItem.remove());
  placeImageButton.addEventListener('click', () => openBigImage(name, url));
  return placeItem;
}

function addPlace(item) {
  elementsPlacesLists.prepend(item);
}

profileAddNewPlaceButton.addEventListener('click', () => openPopup(popupNewPlace));

popupFormNewPlace.addEventListener('submit', function (evt) {
  evt.preventDefault(evt);
  addPlace(createPlace(placeName.value, placeUrl.value));
  //evt.target.reset();
  //placeUrl.reset();
  placeName.value = '';
  placeUrl.value = '';
  closePopup(popupNewPlace);
});

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
