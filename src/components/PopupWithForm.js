import Popup from './Popup.js';
import { selectorsConfig } from './selectorsConfig.js';

export default class PopupWithForm extends Popup {
  constructor({ popup, submitFormCallback }) {
    super({ popup });
    this._callback = submitFormCallback;
    this._form = this._popup.querySelector(selectorsConfig.formSelector);
    this._inputSelector = selectorsConfig.inputSelector;
    this._submitBtn = this._popup.querySelector('.popup__submit');
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll(this._inputSelector);
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._submitBtn.removeEventListener('submit', this._handleSubmit);
  }

  // _handleAddCardSubmit = (evt) => {
  //   this._callback(this._getInputValues(), evt);
  // }
  _handleSubmit = (evt) => {
    this._callback(evt);
  }

  setEventListeners() {
    super._setEventListeners();

    this._form.addEventListener('submit', this._handleSubmit);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this._removeEventListeners();
    this._form.reset();
  }
}
