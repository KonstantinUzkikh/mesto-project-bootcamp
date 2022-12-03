import {profile, cardsArray} from './../index.js';//
import {openPopup, closePopup} from './modal.js';
import {deleteCard, rewriteLike} from './api.js';
import {setButtonTextContant} from './utils.js';

const cardTemplate = document.querySelector('#card-template').content;
const cardsLists = document.querySelector('.elements__cards-list');

const popupMagnificationImage = document.querySelector('.popup_magnification-image');
const popupBigImage = popupMagnificationImage.querySelector('.popup__big-image');
const popupTitleBigImage = popupMagnificationImage.querySelector('.popup__title-big-image');

const popupConfirmationAction = document.querySelector('.popup_confirmation-action');
const buttonConfirmDelete = popupConfirmationAction.querySelector('.popup__button-submit');
let cardToDelete;

function toggleLike(card) {
  let method;
  if ((card.likes.some((item) => {return item === profile._id}))) {method = 'DELETE'} else {method = 'PUT'}
  rewriteLike(method,card.card_id)
  .then((data) => {
    card.likes = data.likes.map((it) => {
      return it._id
    });
    if (card.likes.length > 0) {
      card.refDOM.querySelector('.card__counter-likes').textContent = card.likes.length;
    } else {
      card.refDOM.querySelector('.card__counter-likes').textContent = ''
    };
    card.refDOM.querySelector('.card__button-like').classList.toggle('card__button-like_active');
  })
  .catch(() => {
    alert('УПС... ОШИБКА ПРОСТАВЛЕНИЯ ЛАЙКА');
  })
}

function openBigImage(card) {
  popupTitleBigImage.textContent = card.name;
  popupBigImage.src = card.link;
  popupBigImage.alt='Фотография: ' + card.name;
  openPopup(popupMagnificationImage);
}

function confirmCardDeletion(card) {
  cardToDelete = card;
  setButtonTextContant(buttonConfirmDelete, 'Да');
  openPopup(popupConfirmationAction)
}

buttonConfirmDelete.addEventListener('click', function (evt) {
  evt.preventDefault(evt);
  setButtonTextContant(buttonConfirmDelete, 'Удаление...');
  deleteCard(cardToDelete.card_id)
  .then(() => {
    let indexCard;
    cardsArray.some((item, index) => {
      if (item.card_id === cardToDelete.card_id) {
        indexCard = index;
      }
    })
    removeCardFromDOM(cardsArray[indexCard].refDOM);
    cardsArray.splice(indexCard, 1);
  })
  .catch (() => {
    alert('УПС... ОШИБКА УДАЛЕНИЯ КАРТОЧКИ');
  })
  .finally(() => {
    closePopup();
  })
})

function createCard (card) {
  const cardItem = cardTemplate.querySelector('.elements__card-item').cloneNode(true);
  card.refDOM = cardItem;
  const cardImage = cardItem.querySelector('.card__image');
  const cardTitle = cardItem.querySelector('.card__title');
  const cardCounterLikes = cardItem.querySelector('.card__counter-likes');
  const cardLikeButton = cardItem.querySelector('.card__button-like');
  const cardDeleteButton = cardItem.querySelector('.card__button-delete');
  const cardImageButton = cardItem.querySelector('.card__button-image');
  cardTitle.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt='Фотография: ' + card.name;
  if (card.likes.length != 0) {
    cardCounterLikes.textContent = `${card.likes.length}`;
    if (card.likes.some((item) => {return item === profile._id})) {
      cardLikeButton.classList.add('card__button-like_active');
    }
  }
  cardLikeButton.addEventListener('click', () => toggleLike(card));
  if (card.owner_id === profile._id) {
    cardDeleteButton.classList.add('card__button-delete_active');
    cardDeleteButton.addEventListener('click', () => confirmCardDeletion(card));
  }
  cardImageButton.addEventListener('click', () => openBigImage(card));
  return cardItem;
}

function addCardToDOM(cardItem) {
  cardsLists.prepend(cardItem);
}

function removeCardFromDOM(cardItem) {
  cardItem.remove();
}

export {createCard, addCardToDOM}
