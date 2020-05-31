import SiteHeaderComponent from "../components/siteheader.js";
import MenuComponnent from "../components/sitemenu.js";
import MovieComponent from "../components/movieitem";
import ShowMoreButtonComponent from "../components/showmorebutton.js";
import UserStatsComponent from "../components/userstats.js";
import FilmsContainerComponent from "../components/filmscontainer.js";
import FilmsListComponent from "../components/filmslist.js";
import NoMoviesComponent from "../components/nomoviescomponent.js";
import FilmDetailsComponent from "../components/filmdetails";
import {render, remove, RenderPosition} from "../utils/render";

const FILMS_SHOWING_ON_START = 5;
const FILMS_SHOWING_ON_BUTTON = 5;

const renderMovie = (movieListContainer, movie) => {
  const mainFilmsBoard = document.querySelector(`.films-list__container`);
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
  movieComponent.setPosterClickHandler(() => {
    showPopup();
    document.addEventListener(`keydown`, onEscKeyDown);
  });
  movieComponent.setTitleClickHandler(() => {
    showPopup();
    document.addEventListener(`keydown`, onEscKeyDown);
  });
  movieComponent.setCommentsClickHandler(() => {
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
  loadMoreButton.setClickHandler(() => {
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


export default class PageController {
  constructor(container) {
    this._container = container;
  }

  render(movies) {
    renderMainFilmsBoard(this._container, movies);
  }
}
