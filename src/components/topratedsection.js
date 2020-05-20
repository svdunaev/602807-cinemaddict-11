import {generateMovieTemplate} from "../../helpers.js";
import {createMovieTemplate} from "./movieitem.js";

const EXTRA_FILMS = 2;

export const createTopRatedTemplate = () => {
  return (
    `<section class="films-list--extra">
    <h2 class="films-list__title">Top rated</h2>

    <div class="films-list__container">
      ${generateMovieTemplate(EXTRA_FILMS, createMovieTemplate())}
    </div>
  </section>`
  );
};
