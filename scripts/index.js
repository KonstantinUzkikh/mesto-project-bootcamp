// profile events

const personalCard = document.querySelector('.personal-card');
const personalCardName = personalCard.querySelector('.personal-card__name');
const personalCardActivity = personalCard.querySelector('.personal-card__activity');
const personalCardEditButton = personalCard.querySelector('.personal-card__edit-button');

const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupCloseButtonEditProfile = popupEditProfile.querySelector('.popup__close-button_edit-profile');
const popupFormEditProfile = popupEditProfile.querySelector('.popup__form_edit-profile');
const inputName = document.querySelector('.popup__input_edit-profile-name');
const inputActivity = document.querySelector('.popup__input_edit-profile-activity');

function saveProfile (name, activity) {
  personalCardName.textContent = name;
  personalCardActivity.textContent = activity;
}

function readProfile (name, activity) {
  name = personalCardName.textContent;
  activity = personalCardActivity.textContent;
}

personalCardEditButton.addEventListener('click', function (et) {
  popupEditProfile.classList.toggle('popup_disappearance');
  popupEditProfile.classList.toggle('popup_appearance');
  readProfile (inputName.value, inputActivity.value);
});

popupCloseButtonEditProfile.addEventListener('click', function() {
  popupEditProfile.classList.toggle('popup_appearance');
  popupEditProfile.classList.toggle('popup_disappearance');
});

popupFormEditProfile.addEventListener('submit', function (evt) {
  evt.preventDefault();
  saveProfile(inputName.value, inputActivity.value);
  popupEditProfile.classList.toggle('popup_appearance');
  popupEditProfile.classList.toggle('popup_disappearance');
});

// places events

const profileAddNewPlaceButton = document.querySelector('.profile__add-new-place-button');

const placeTemplate = document.querySelector('#place-template').content;
const elementsPlacesLists = document.querySelector('.elements__places-list');

const popupNewPlace = document.querySelector('.popup_new-place');
const popupCloseButtonNewPlace = popupNewPlace.querySelector('.popup__close-button_new-place');
const popupFormNewPlace = popupNewPlace.querySelector('.popup__form_new-place');
const placeName = document.querySelector('.popup__input_new-place-name');
const placeUrl = document.querySelector('.popup__input_new-place-url');

const popupIncreasedImage = document.querySelector('.popup_increased-image');
const bigImageContainer = document.querySelector('.popup__big-image-container');

const popupCloseButtonBigImage = bigImageContainer.querySelector('.popup__close-button_big-image');
const popupBigImage = bigImageContainer.querySelector('.popup__big-image');
const popupTitleBigImage = bigImageContainer.querySelector('.popup__title-big-image');

function openBigImage (placeName, placeUrl) {
  popupTitleBigImage.textContent = placeName;
  popupBigImage.src = placeUrl;
  popupBigImage.alt='Фотография: ' + placeName;
  popupIncreasedImage.classList.toggle('popup_disappearance');
  popupIncreasedImage.classList.toggle('popup_appearance');
}

function closeBigImage (bigImageContainer) {
  popupIncreasedImage.classList.toggle('popup_appearance');
  popupIncreasedImage.classList.toggle('popup_disappearance');
}

function addPlace(placeName, placeUrl) {
  const placeItem = placeTemplate.querySelector('.elements__place-item').cloneNode(true);
  const placeImage = placeItem.querySelector('.place__image');
  const placeTitle = placeItem.querySelector('.place__title');
  const placeLikeButton = placeItem.querySelector('.place__like-button');
  const placeDeleteButton = placeItem.querySelector('.place__delete-button');
  const placeImageButton = placeItem.querySelector('.place__image-button');
  placeTitle.textContent = placeName;
  placeImage.src = placeUrl;
  placeImage.alt='Фотография: ' + placeName;
  elementsPlacesLists.prepend(placeItem);
  placeLikeButton.addEventListener('click', () => {placeLikeButton.classList.toggle('place__like-button_active')});
  placeDeleteButton.addEventListener('click', () => {placeItem.remove()});
  placeImageButton.addEventListener('click', () => {openBigImage(placeName, placeUrl)});
}

profileAddNewPlaceButton.addEventListener('click', function() {
  popupNewPlace.classList.toggle('popup_disappearance');
  popupNewPlace.classList.toggle('popup_appearance');
});

popupFormNewPlace.addEventListener('reset', function(evt) {
  evt.preventDefault();
  popupNewPlace.classList.toggle('popup_appearance');
  popupNewPlace.classList.toggle('popup_disappearance');
});

popupFormNewPlace.addEventListener('submit', function (evt) {
  evt.preventDefault();
  addPlace(placeName.value, placeUrl.value);
  popupNewPlace.classList.toggle('popup_appearance');
  popupNewPlace.classList.toggle('popup_disappearance');
  placeName.value = '';
  placeUrl.value = '';
});

popupCloseButtonBigImage.addEventListener('click', () => {closeBigImage(bigImageContainer)});

// initialization

  const initialProfile = {
    name: 'Жак-Ив Кусто',
    activity: 'Исследователь океана'
  }

  saveProfile(initialProfile.name, initialProfile.activity);

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
  addPlace(initialCardsPlaces[i].name, initialCardsPlaces[i].link)
}
