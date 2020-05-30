import {createElement} from "../utils.js";

const createFooterInfoTemplate = (moviesLength) => {
  return (
    `<p>${moviesLength} movies inside</p>`
  );
};

export default class FooterInfoComponent {
  constructor(moviesLength) {
    this._moviesLength = moviesLength;
    this._element = null;
  }

  getTemplate() {
    return createFooterInfoTemplate(this._moviesLength);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
