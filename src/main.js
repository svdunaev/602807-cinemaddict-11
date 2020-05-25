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
import {generateFilters} from "./mock/filter.js";
import {generateMovies} from "./mock/movie.js";
import {createFilmDetails} from "./components/filmdetails.js";
import {createFooterInfo} from "./components/footerinfo.js";

const FILMS_COUNT = 23;
const FILMS_SHOWING_ON_START = 5;
const FILMS_SHOWING_ON_BUTTON = 5;
const EXTRA_FILMS = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);

render(siteHeaderElement, createSiteHeaderTemplate(), `beforeend`);

const siteMainElement = document.querySelector(`.main`);

const movies = generateMovies(FILMS_COUNT);
const filters = generateFilters(movies);

render(siteMainElement, createMenuTemplate(filters), `beforeend`);

render(siteMainElement, createFilmContainerTemplate(), `beforeend`);

const filmContainer = document.querySelector(`.films`);

render(filmContainer, createFilmsListTemplate(), `beforeend`);

const filmsList = filmContainer.querySelector(`.films-list`);
const filmItemContainer = filmsList.querySelector(`.films-list__container`);

let showingMovieCount = FILMS_SHOWING_ON_START;

for (let i = 0; i < showingMovieCount; i++) {
  render(filmItemContainer, createMovieTemplate(movies[i]), `beforeend`);
}

render(filmsList, createShowMoreButtonTemplate(), `beforeend`);

const loadMoreButton = document.querySelector(`.films-list__show-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevMovieCount = showingMovieCount;
  showingMovieCount = showingMovieCount + FILMS_SHOWING_ON_BUTTON;

  movies.slice(prevMovieCount, showingMovieCount).forEach((movie) => render(filmItemContainer, createMovieTemplate(movie), `beforeend`));

  if (showingMovieCount >= movies.length) {
    loadMoreButton.remove();
  }
});

const siteFooterElement = document.querySelector(`.footer`);

render(siteFooterElement, createFooterInfo(movies), `beforeend`);

render(siteFooterElement, createFilmDetails(movies[0]), `afterend`);

render(filmContainer, createTopRatedTemplate(movies.slice(0, EXTRA_FILMS)), `beforeend`);
render(filmContainer, createMostCommentedTemplate(movies.slice(0, EXTRA_FILMS)), `beforeend`);
