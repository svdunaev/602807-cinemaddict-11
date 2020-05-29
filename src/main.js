import SiteHeaderComponent from "./components/siteheader.js";
import MenuComponnent from "./components/sitemenu.js";
import MovieComponent from "./components/movieitem";
import ShowMoreButtonComponent from "./components/showmorebutton.js";
import UserStatsComponent from "./components/userstats.js";
import FilmsContainerComponent from "./components/filmscontainer.js";
import FilmsListComponent from "./components/filmslist.js";
import TopRatedComponent from "./components/topratedsection.js";
import MostCommentedComponent from "./components/mostcommentedsection.js";
import {generateFilters} from "./mock/filter.js";
import {generateMovies} from "./mock/movie.js";
import FilmDetailsComponent from "./components/filmdetails.js";
import {createFooterInfo} from "./components/footerinfo.js";
import {render, RenderPosition} from "./utils.js";

const FILMS_COUNT = 23;
const FILMS_SHOWING_ON_START = 5;
const FILMS_SHOWING_ON_BUTTON = 5;
const EXTRA_FILMS = 2;

const siteHeaderElement = document.querySelector(`.header`);

const siteMainElement = document.querySelector(`.main`);

const movies = generateMovies(FILMS_COUNT);
const filters = generateFilters(movies);
// const moviesLength = movies.length;

// const filmContainer = document.querySelector(`.films`);

// const filmsList = filmContainer.querySelector(`.films-list`);
// const filmItemContainer = filmsList.querySelector(`.films-list__container`);

// let showingMovieCount = FILMS_SHOWING_ON_START;

// const loadMoreButton = document.querySelector(`.films-list__show-more`);

// loadMoreButton.addEventListener(`click`, () => {
//   const prevMovieCount = showingMovieCount;
//   showingMovieCount = showingMovieCount + FILMS_SHOWING_ON_BUTTON;

//   movies.slice(prevMovieCount, showingMovieCount).forEach((movie) => render(filmItemContainer, createMovieTemplate(movie), `beforeend`));

//   if (showingMovieCount >= movies.length) {
//     loadMoreButton.remove();
//   }
// });

// const siteFooterElement = document.querySelector(`.footer`);

// render(siteFooterElement, createFooterInfo(moviesLength), `beforeend`);

// render(siteFooterElement, createFilmDetails(movies[0]), `afterend`);

const renderMovie = (movieListContainer, movie) => {
  const movieComponent = new MovieComponent(movie);
  const moviePoster = movieComponent.getElement().querySelector(`.film-card__poster`);
  const movieTitle = movieComponent.getElement().querySelector(`.film-card__title`);
  const movieCommentsCount = movieComponent.getElement().querySelector(`.film-card__comments`);
  // moviePoster.addEventListener();
  // movieTitle.addEventListener();
  // movieCommentsCount.addEventListener();

  const movieDetailsComponent = new FilmDetailsComponent(movie);
  const detailsPopupClose = movieDetailsComponent.getElement().querySelector(`.film-details__close-btn`);
  // detailsPopupClose.addEventListener();
  render(movieListContainer, movieComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderMainFilmsBoard = (boardComponent, moviesArr) => {
  const mainMovieListContainer = boardComponent.getElement().querySelector(`.films-list__container`);

  let showingMovieCount = FILMS_SHOWING_ON_START;
  moviesArr.slice(0, showingMovieCount).forEach((movie) => renderMovie(mainMovieListContainer, movie));
  const loadMoreButton = new ShowMoreButtonComponent();
  render(boardComponent.getElement(), loadMoreButton.getElement(), RenderPosition.BEFOREEND);
  loadMoreButton.getElement().addEventListener(`click`, () => {
    const prevMovieCount = showingMovieCount;
    showingMovieCount = showingMovieCount + FILMS_SHOWING_ON_BUTTON;
    moviesArr.slice(prevMovieCount, showingMovieCount).forEach((movie) => renderMovie(mainMovieListContainer, movie));
    if (showingMovieCount >= moviesArr.length) {
      loadMoreButton.getElement().remove();
      loadMoreButton.removeElement();
    }
  });
};

render(siteHeaderElement, new SiteHeaderComponent().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new MenuComponnent(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilmsContainerComponent().getElement(), RenderPosition.BEFOREEND);

const siteFilmsSection = siteMainElement.querySelector(`.films`);
const mainFilmsBoard = new FilmsListComponent();

render(siteFilmsSection, mainFilmsBoard.getElement(), RenderPosition.BEFOREEND);
renderMainFilmsBoard(mainFilmsBoard, movies);
render(siteFilmsSection, new TopRatedComponent(movies.slice(0, EXTRA_FILMS)).getElement(), RenderPosition.BEFOREEND);
render(siteFilmsSection, new MostCommentedComponent(movies.slice(0, EXTRA_FILMS)).getElement(), RenderPosition.BEFOREEND);

