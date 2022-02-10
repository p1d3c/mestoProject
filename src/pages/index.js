import './index.css';
import Card from '../components/Card.js';
import { selectorsConfig } from '../components/selectorsConfig.js';
import FormValidator from '../components/FormValidator.js';
import { initialCards,
  editBtn,
  addBtn,
  profilePopupElement,
  addCardPopupElement,
  imgPopupElement,
  profNameSelector,
  profJobSelector,
  nameInput,
  jobInput,
  editFormElementSelector,
  editSubmitBtn,
  addFormElementSelector,
  addSubmitBtn,
  cardListSelector
} from '../utils/utils.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';

const openedImg = new PopupWithImage({
  popup: imgPopupElement
});

function createNewCard(items, place) {
  items.forEach(item => {
    console.log(1);
    const card = new Card({
    data: item,
    handleCardClick: () => {
      openedImg.open(item);
    }
  });
  const cardElement = card.createCard();
  cardsContainer.addItem(cardElement, place);
  });
}

function fillProfilePopupInputs() {
  const userInfo = userInformation.getUserInfo();
  nameInput.value = userInfo.userName;
  jobInput.value = userInfo.userJob;
}

const userInformation = new UserInfo({
  nameSelector: profNameSelector,
  jobSelector: profJobSelector,
});

const cardsContainer = new Section({
  renderer: (item) => {
    createNewCard(item, 'end');
    },
  },
  cardListSelector
);

const profilePopup = new PopupWithForm({
  popup: profilePopupElement,
  submitFormCallback: (evt) => {
    evt.preventDefault();
    userInformation.setUserInfo({
      name: nameInput.value,
      job: jobInput.value
    });
    profilePopup.close();
  }
});

const addCardPopup = new PopupWithForm({
  popup: addCardPopupElement,
  submitFormCallback: (evt) => {
      evt.preventDefault();
      const newCardData = addCardPopup.getInputValues();
      addFormValidator.disableButton(
        addSubmitBtn,
        selectorsConfig.inactiveButtonClass);
      addCardPopup.close();
  }
});

const editFormValidator = new FormValidator(
  selectorsConfig,
  editFormElementSelector
);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(
  selectorsConfig,
  addFormElementSelector
);
addFormValidator.enableValidation();

profilePopup.setEventListeners();
addCardPopup.setEventListeners();

window.onload = cardsContainer.addItem(createNewCard(initialCards, 'end'));

editBtn.addEventListener('click', () => {
  editFormValidator.activateButton(
    editSubmitBtn,
    selectorsConfig.inactiveButtonClass);
  editFormValidator.hideErrorMessage();
  profilePopup.open();
  fillProfilePopupInputs();
});

addBtn.addEventListener('click', () => {
  addFormValidator.enableValidation();
  addFormValidator.hideErrorMessage();
  addCardPopup.open();
});
