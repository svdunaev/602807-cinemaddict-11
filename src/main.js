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

const FILMS_COUNT = 23;
const FILMS_SHOWING_ON_START = 5;
const FILMS_SHOWING_ON_BUTTON = 5;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);

render(siteHeaderElement, createSiteHeaderTemplate(), `beforeend`);

const siteMainElement = document.querySelector(`.main`);

const filters = generateFilters();
const movies = generateMovies(FILMS_COUNT);

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

const sitePopupElement = document.querySelector(`.film-details`);
const closePopupButton = document.querySelector(`.film-details__close-btn`);
const siteFooterElement = document.querySelector(`.footer`);
const filmCard = document.querySelectorAll(`.film-card__poster`);

const openFilmDetails = () => {
  render(siteFooterElement, createFilmDetails(movie), `afterend`);
};

// filmCard.forEach(addEventListener(`click`, () => {
//   openFilmDetails();
// }));


render(filmContainer, createTopRatedTemplate(), `beforeend`);


render(filmContainer, createMostCommentedTemplate(), `beforeend`);


document.addEventListener(`click`, function (event) {
  if (
    event.target.className === `.film-details__close-btn`
  ) {
    console.log(`click`);
  }
});
