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
import FooterInfoComponent from "./components/footerinfo.js";
import {render, remove, RenderPosition} from "./utils/render.js";
import NoMoviesComponent from "./components/nomoviescomponent.js";

const FILMS_COUNT = 23;
const FILMS_SHOWING_ON_START = 5;
const FILMS_SHOWING_ON_BUTTON = 5;
const EXTRA_FILMS = 2;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const movies = generateMovies(FILMS_COUNT);
const filters = generateFilters(movies);
const moviesLength = movies.length;

const renderMovie = (movieListContainer, movie) => {
  const showPopup = () => {
    mainFilmsBoard.getElement().appendChild(movieDetailsComponent.getElement());
  };
  const removePopup = () => {
    mainFilmsBoard.getElement().removeChild(movieDetailsComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      removePopup();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const movieComponent = new MovieComponent(movie);
  const moviePoster = movieComponent.getElement().querySelector(`.film-card__poster`);
  const movieTitle = movieComponent.getElement().querySelector(`.film-card__title`);
  const movieCommentsCount = movieComponent.getElement().querySelector(`.film-card__comments`);
  moviePoster.addEventListener(`click`, () => {
    showPopup();
    document.addEventListener(`keydown`, onEscKeyDown);
  });
  movieTitle.addEventListener(`click`, () => {
    showPopup();
    document.addEventListener(`keydown`, onEscKeyDown);
  });
  movieCommentsCount.addEventListener(`click`, () => {
    showPopup();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const movieDetailsComponent = new FilmDetailsComponent(movie);
  const detailsPopupClose = movieDetailsComponent.getElement().querySelector(`.film-details__close-btn`);
  detailsPopupClose.addEventListener(`click`, () => {
    removePopup();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });
  render(movieListContainer, movieComponent, RenderPosition.BEFOREEND);
};

const renderMainFilmsBoard = (boardComponent, moviesArr) => {
  const mainMovieListContainer = boardComponent.getElement().querySelector(`.films-list__container`);

  const isAllMoviesWatched = moviesArr.every((movie) => movie.isWatched);
  let showingMovieCount = FILMS_SHOWING_ON_START;
  moviesArr.slice(0, showingMovieCount).forEach((movie) => renderMovie(mainMovieListContainer, movie));
  const loadMoreButton = new ShowMoreButtonComponent();
  render(boardComponent.getElement(), loadMoreButton, RenderPosition.BEFOREEND);
  loadMoreButton.getElement().addEventListener(`click`, () => {
    const prevMovieCount = showingMovieCount;
    showingMovieCount = showingMovieCount + FILMS_SHOWING_ON_BUTTON;
    moviesArr.slice(prevMovieCount, showingMovieCount).forEach((movie) => renderMovie(mainMovieListContainer, movie));
    if (showingMovieCount >= moviesArr.length) {
      remove(loadMoreButton);
    }
  });
  if (isAllMoviesWatched) {
    render(boardComponent.getElement(), new NoMoviesComponent(), RenderPosition.BEFOREEND);
    remove(loadMoreButton.getElement());
    remove(loadMoreButton);
  }
};

const renderExtraBoard = (extraBoardComponent, moviesArr) => {
  const extraMovieContainer = extraBoardComponent.getElement().querySelector(`.films-list__container`);

  let showingMovieCount = EXTRA_FILMS;
  moviesArr.slice(0, showingMovieCount).forEach((movie) => renderMovie(extraMovieContainer, movie));
};


render(siteHeaderElement, new SiteHeaderComponent(), RenderPosition.BEFOREEND);
render(siteMainElement, new MenuComponnent(filters), RenderPosition.BEFOREEND);
render(siteMainElement, new FilmsContainerComponent(), RenderPosition.BEFOREEND);

const siteFilmsSection = siteMainElement.querySelector(`.films`);
const mainFilmsBoard = new FilmsListComponent();
const extraTopRatedBoard = new TopRatedComponent();
const extraMostCommentedBoard = new MostCommentedComponent();

render(siteFilmsSection, mainFilmsBoard, RenderPosition.BEFOREEND);
renderMainFilmsBoard(mainFilmsBoard, movies);
render(siteFilmsSection, extraTopRatedBoard, RenderPosition.BEFOREEND);
renderExtraBoard(extraTopRatedBoard, movies);
render(siteFilmsSection, extraMostCommentedBoard, RenderPosition.BEFOREEND);
renderExtraBoard(extraMostCommentedBoard, movies);


const footerInfoSection = siteFooterElement.querySelector(`.footer__statistics`);
render(footerInfoSection, new FooterInfoComponent(moviesLength), RenderPosition.BEFOREEND);
