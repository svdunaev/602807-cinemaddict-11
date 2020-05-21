import {generateMovieTemplate} from "../../helpers.js";
import {createMovieTemplate} from "../components/movieitem.js";
import {generateMovies} from "../mock/movie.js";
const EXTRA_FILMS = 2;
const movies = generateMovies(EXTRA_FILMS);

export const createTopRatedTemplate = () => {
  return (
    `<section class="films-list--extra">
    <h2 class="films-list__title">Top rated</h2>

    <div class="films-list__container">
      ${generateMovieTemplate(EXTRA_FILMS, createMovieTemplate(movies[0]))}
    </div>
  </section>`
  );
};
