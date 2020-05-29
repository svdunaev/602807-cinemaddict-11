import {createElement} from "../utils.js";

const createMovieTemplate = (movie) => {
  const {
    filminfo,
    comments,
    userDetails,
    description
  } = movie;

  const {title, totalRating, runtime, genre, release, poster} = filminfo;
  const {date} = release;

  const commentsCount = comments.length;
  const releaseYear = date.getFullYear();

  const {isWatched, isFavorite, inWatchlist} = userDetails;

  const movieDescription = description.join(` `);

  return (
    `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${totalRating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${releaseYear}</span>
      <span class="film-card__duration">${runtime}</span>
      <span class="film-card__genre">${genre[0]}</span>
    </p>
    <img src="${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${movieDescription.length > 140 ? `${movieDescription.substring(0, 139)}…` : movieDescription}</p>
    <a class="film-card__comments">${commentsCount} comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${inWatchlist ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatched ? `film-card__controls-item--active` : ``}">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavorite ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
    </form>
  </article>`
  );
};


const createTopRatedTemplate = (movies) => {
  const moviesStr = movies.map((movie) => createMovieTemplate(movie));

  return (
    `<section class="films-list--extra">
    <h2 class="films-list__title">Top rated</h2>

    <div class="films-list__container">
      ${moviesStr}
    </div>
  </section>`
  );
};

export default class TopRatedComponent {
  constructor(movies) {
    this._movies = movies;
    this._element = null;
  }

  getTemplate() {
    return createTopRatedTemplate(this._movies);
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
//  movies.map((movie) => createMovieTemplate(movie))
