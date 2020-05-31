import AbstractComponent from "../components/AbstractComponent.js";

const createFooterInfoTemplate = (moviesLength) => {
  return (
    `<p>${moviesLength} movies inside</p>`
  );
};

export default class FooterInfoComponent extends AbstractComponent {
  constructor(moviesLength) {
    super();
    this._moviesLength = moviesLength;
  }

  getTemplate() {
    return createFooterInfoTemplate(this._moviesLength);
  }
}
