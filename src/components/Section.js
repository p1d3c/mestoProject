export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    items.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(element, method) {
    if (method === 'start') {
      this._container.prepend(element);
    } else {
      this._container.append(element);
    }
  }
}