// server request parameters
const config = {
  baseUrl: 'https://nomoreparties.co/v1/wbf-cohort-3',
  headers: {
      authorization: '29081990-548c-4f14-9b01-8d4a7169b3f0',
      'Content-Type': 'application/json'
  }
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

function request(url, methodValue, bodyValue) {
  const options = {
    method: `${methodValue}`,
    headers: config.headers,
  }
  if (bodyValue != undefined) {options.body = JSON.stringify(bodyValue)};
  return fetch(url, options).then(checkResponse)
}

function getProfile() {
  return request(`${config.baseUrl}/users/me`,'GET');
}

function patchProfile(profileName, profileActivity) {
  return request(`${config.baseUrl}/users/me`,'PATCH', {name: profileName, about: profileActivity});
}

function patchAvatar(profileAvatarUrl) {
  return request(`${config.baseUrl}/users/me/avatar`,'PATCH', {avatar: profileAvatarUrl});
}

function getCards() {
  return request(`${config.baseUrl}/cards`,'GET');
}

function postCard(cardItem) {
  return request(`${config.baseUrl}/cards`,'POST', {name: cardItem.name, link: cardItem.link});
}

function deleteCard(cardItem) {
  return request(`${config.baseUrl}/cards/${cardItem.card_id}`,'DELETE');
}

function rewriteLike(methodValue, cardItem) {
  return request(`${config.baseUrl}/cards/likes/${cardItem.card_id}`,methodValue);
}

export {getProfile, patchProfile, patchAvatar, getCards, postCard, deleteCard, rewriteLike}
