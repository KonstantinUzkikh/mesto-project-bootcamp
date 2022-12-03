//
// https://burst.shopifycdn.com/photos/cute-curious-cat.jpg?width=925&format=pjpg&exif=1&iptc=1//
// https://burst.shopifycdn.com/photos/business-pug-working-on-laptop.jpg?width=373&format=pjpg&exif=1&iptc=1
// https://burst.shopifycdn.com/photos/hiker-looks-up-at-vertical-mountain-peaks.jpg?width=925&format=pjpg&exif=1&iptc=1


// server request parameters

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wbf-cohort-3',
  headers: {
      authorization: '29081990-548c-4f14-9b01-8d4a7169b3f0',
      'Content-Type': 'application/json'
  }
}

function getProfile() {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch(() => {
    alert('УПС... ОШИБКА ЧТЕНИЯ ПРОФИЛЯ');
  })
}

function patchProfile(profileName, profileActivity) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: profileName,
      about: profileActivity
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch(() => {
    alert('УПС... ОШИБКА ЗАПИСИ ПРОФИЛЯ');
  })
}

function patchAvatar(profileAvatarUrl) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: profileAvatarUrl
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch(() => {
    alert('УПС... ОШИБКА ЗАПИСИ АВАТАРА');
  })
}

function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch(() => {
    alert('УПС... ОШИБКА ЧТЕНИЯ КАРТОТЕКИ');
  })
}

function postCard(cardItem) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardItem.name,
      link: cardItem.link
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch(() => {
    alert('УПС... ОШИБКА ЗАПИСИ КАРТОЧКИ');
  })
}

function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch(() => {
    alert('УПС... ОШИБКА УДАЛЕНИЯ КАРТОЧКИ');
  })
}

function rewriteLike(methodValue, cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: `${methodValue}`,
    headers: config.headers,
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch(() => {
    alert('УПС... ОШИБКА ЗАПИСИ/УДАЛЕНИЯ ЛАЙКА');
  })
}

export {getProfile, patchProfile, patchAvatar, getCards, postCard, deleteCard, rewriteLike}
