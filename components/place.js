import {openPopup} from "./modal.js";

const placeTemplate = document.querySelector('#place-template').content;
const placesLists = document.querySelector('.elements__places-list');

const popupIncreasedImage = document.querySelector('.popup_increased-image');
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

function addPlace(placeItem) {
  placesLists.prepend(placeItem);
}

export {createPlace, addPlace}
