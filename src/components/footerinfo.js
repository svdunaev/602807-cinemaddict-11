import {createElement} from "../utils.js";

const createFooterInfo = (moviesLength) => {
  return (
    `
   <section class="footer__statistics">
     <p>${moviesLength} movies inside</p>
   </section>`
  );
};

export default class FooterInfoComponent {
  constructor(moviesLength) {
    this._moviesLength = moviesLength;
    this._element = null;
  }

  getTemplate() {
    return createFooterInfo(this._moviesLength);
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
