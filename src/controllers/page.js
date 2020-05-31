import SiteHeaderComponent from "../components/siteheader.js";
import MenuComponnent from "../components/sitemenu.js";
import MovieComponent from "../components/movieitem";
import ShowMoreButtonComponent from "../components/showmorebutton.js";
import UserStatsComponent from "../components/userstats.js";
import FilmsListComponent from "../components/filmslist.js";
import NoMoviesComponent from "../components/nomoviescomponent.js";
import FilmDetailsComponent from "../components/filmdetails";
import TopRatedComponent from "../components/topratedsection.js";
import MostCommentedComponent from "../components/mostcommentedsection.js";
import {render, remove, RenderPosition} from "../utils/render";

const FILMS_SHOWING_ON_START = 5;
const FILMS_SHOWING_ON_BUTTON = 5;
const EXTRA_FILMS = 2;

const renderMovie = (movieListContainer, movie) => {
  const showPopup = () => {
    sectionComponent.getElement().appendChild(movieDetailsComponent.getElement());
  };
  const removePopup = () => {
    sectionComponent.getElement().removeChild(movieDetailsComponent.getElement());
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

const renderMainFilmsBoard = (sectionComponent, movies) => {

  let showingMovieCount = FILMS_SHOWING_ON_START;
  movies.slice(0, showingMovieCount).forEach((movie) => renderMovie(sectionComponent, movie));
  const loadMoreButton = new ShowMoreButtonComponent();
  render(sectionComponent.getElement(), loadMoreButton, RenderPosition.BEFOREEND);
  loadMoreButton.setClickHandler(() => {
    const prevMovieCount = showingMovieCount;
    showingMovieCount = showingMovieCount + FILMS_SHOWING_ON_BUTTON;
    movies.slice(prevMovieCount, showingMovieCount).forEach((movie) => renderMovie(sectionComponent, movie));
    if (showingMovieCount >= movies.length) {
      remove(loadMoreButton);
    }
  });
};

const renderExtraBoard = (extraBoardComponent, moviesArr) => {
  const extraMovieContainer = extraBoardComponent.getElement().querySelector(`.films-list__container`);

  let showingMovieCount = EXTRA_FILMS;
  moviesArr.slice(0, showingMovieCount).forEach((movie) => renderMovie(extraMovieContainer, movie));
};

const renderFilmsPage = (boardComponent, movies) => {
  // const isAllMoviesWatched = movies.every((movie) => movie.isWatched);

  const sectionComponent = new FilmsListComponent();
  renderMainFilmsBoard(sectionComponent, movies);

  const extraTopRatedComponent = new TopRatedComponent();
  const extraMostCommentedComponent = new MostCommentedComponent();
  renderExtraBoard(extraTopRatedComponent, movies);
  renderExtraBoard(extraMostCommentedComponent, movies);
  // if (isAllMoviesWatched) {
  //   render(boardComponent.getElement(), new NoMoviesComponent(), RenderPosition.BEFOREEND);
  //   remove(loadMoreButton.getElement());
  //   remove(loadMoreButton);
  // }
};

export default class PageController {
  constructor(container) {
    this._container = container;
  }

  render(movies) {
    renderFilmsPage(this._container, movies);
  }
}
