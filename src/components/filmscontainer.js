import AbstractComponent from "../components/AbstractComponent.js";

const createFilmContainerTemplate = () => {
  return (
    `<section class="films"></section>`
  );
};

export default class FilmsContainerComponent extends AbstractComponent {
  getTemplate() {
    return createFilmContainerTemplate();
  }
}
