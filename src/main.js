import {createSiteHeaderTemplate} from "./components/siteheader.js";
import {createMenuTemplate} from "./components/sitemenu.js";
import {createMovieTemplate} from "./components/movieitem";
import {createShowMoreButtonTemplate} from "./components/showmorebutton.js";
import {createPopupTemplate} from "./components/statisticspopup.js";
import {createUserStatisticsTemplate} from "./components/userstats.js";
import {createFilmContainerTemplate} from "./components/filmscontainer.js";
import {createFilmsListTemplate} from "./components/filmslist.js";
import {createTopRatedTemplate} from "./components/topratedsection.js";
import {createMostCommentedTemplate} from "./components/mostcommentedsection.js";

const FILMS_COUNT = 5;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);

render(siteHeaderElement, createSiteHeaderTemplate(), `beforeend`);

const siteMainElement = document.querySelector(`.main`);

render(siteMainElement, createMenuTemplate(), `beforeend`);

render(siteMainElement, createFilmContainerTemplate(), `beforeend`);

const filmContainer = document.querySelector(`.films`);

render(filmContainer, createFilmsListTemplate(), `beforeend`);

const filmsList = filmContainer.querySelector(`.films-list`);
const filmItemContainer = filmsList.querySelector(`.films-list__container`);

for (let i = 0; i < FILMS_COUNT; i++) {
  render(filmItemContainer, createMovieTemplate(), `beforeend`);
}

render(filmsList, createShowMoreButtonTemplate(), `beforeend`);

render(filmContainer, createTopRatedTemplate(), `beforeend`);
render(filmContainer, createMostCommentedTemplate(), `beforeend`);
