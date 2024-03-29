export default class Api {
  constructor({ baseUrl, headers, renderCardsCallback, setUserInfoCallback, addNewCardCallback }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._renderCardsCallback = renderCardsCallback;
    this._setUserInfoCallback = setUserInfoCallback;
    this._addNewCardCallback = addNewCardCallback;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers
    })
    .then((res) => {
      return this._getResponseData(res);
    })
  }

  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      headers: this._headers
    })
    .then((res) => {
      return this._getResponseData(res);
    })
  }

  setUserInfo({ name, about }) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name, about })
    })
    .then((res) => {
      return this._getResponseData(res);
    })
  }

  addCard({ name, link }) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then((res) => {
      return this._getResponseData(res);
    })
  }

  delCard({ cardId }) {
    return fetch(this._baseUrl + `/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => {
      return this._getResponseData(res);
    })
  }

  likeCard({ cardId }) {
    return fetch(this._baseUrl + `/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then((res) => {
      return this._getResponseData(res);
    })
  }

  dislikeCard({ cardId }) {
    return fetch(this._baseUrl + `/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => {
      return this._getResponseData(res);
    })
  }

  changeAvatar({ avatarPopupInputValue }) {
    return fetch(this._baseUrl + `/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarPopupInputValue.avatar
      })
    })
    .then((res) => {
      return this._getResponseData(res);
    })
  }
}
