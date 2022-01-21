export { fillImgPopup }
import { Card } from './Card.js'
import { selectorsConfig } from './selectorsConfig.js'
import FormValidator from './FormValidator.js';

const editBtn = document.querySelector('.profile__edit-btn');
const addBtn = document.querySelector('.profile__add-btn');

const profilePopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_add');
const imgPopup = document.querySelector('.popup_type_img');

const profName = document.querySelector('.profile__title');
const profJob = document.querySelector('.profile__subtitle');
const profilePopupName = document.querySelector('.popup__input_type_name');
const profilePopupJob = document.querySelector('.popup__input_type_job');

const editFormElement = document.querySelector('.popup__form_type_edit');
const editSubmitBtn = document.querySelector('button[name="edit-submit"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');

const addFormElement = document.querySelector('.popup__form_type_add');
const addSubmitBtn = document.querySelector('button[name="add-submit"]');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_image');

const cardList = document.querySelector('.elements');

const showImage = imgPopup.querySelector('.popup__image');
const showCaption = imgPopup.querySelector('.popup__caption');

const initialCards = [
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

function closePopup(popup) {
  popup.classList.remove('popup_opened');

  document.removeEventListener('click', closeViaBtnOrOverlay);

  document.removeEventListener('keydown', closeViaEsc);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');

  document.addEventListener('click', closeViaBtnOrOverlay);

  document.addEventListener('keydown', closeViaEsc);
}

function submitFormHandler (evt) {
  evt.preventDefault();

  profName.textContent = nameInput.value;
  profJob.textContent = jobInput.value;

  closePopup(profilePopup);
}

function fillProfilePopup() {
  profilePopupName.value = profName.textContent;
  profilePopupJob.value = profJob.textContent;
  openPopup(profilePopup);
  editFormValidator.activateButton(editSubmitBtn, selectorsConfig.inactiveButtonClass);
}

function fillAddCardPopup() {
  openPopup(addCardPopup);
}

function fillImgPopup(el) {
  showImage.src = el.link;
  showImage.alt = el.name;
  showCaption.textContent = el.name;
  openPopup(imgPopup);
}

function pasteCard(el, method) {
  const elementCard = new Card(el).createCard();
  if (method === 'end') {
    cardList.prepend(elementCard);
  } else {
    cardList.append(elementCard);
  }
}

function addNewCard(evt) {
  evt.preventDefault();
  const newCard = {
    name: titleInput.value,
    link: linkInput.value
  };
    pasteCard(newCard, 'end');
    closePopup(addCardPopup);
    addFormElement.reset();
    editFormValidator.disableButton(addSubmitBtn, selectorsConfig.inactiveButtonClass);
}

function renderCards() {
  initialCards.forEach((el) => pasteCard(el, 'start'));
}

function closeViaEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function closeViaBtnOrOverlay(evt) {
  if (evt.target.classList.contains('popup__overlay')
  || evt.target.classList.contains('popup__close-btn')) {
    const closestPopup = evt.target.closest('.popup');
    closePopup(closestPopup);
  }
}

window.onload = renderCards();

const editFormValidator = new FormValidator(selectorsConfig);
editFormValidator.enableValidation();

editBtn.addEventListener('click', fillProfilePopup);
addBtn.addEventListener('click', fillAddCardPopup);

editFormElement.addEventListener('submit', submitFormHandler);
addFormElement.addEventListener('submit', addNewCard);

