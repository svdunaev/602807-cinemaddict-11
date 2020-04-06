import {generateMovieTemplate} from "./movietemplategenerator.js";

const EXTRA_FILMS = 2;

export const createMostCommentedTemplate = () => {
  return (
    `<section class="films-list--extra">
    <h2 class="films-list__title">Most commented</h2>

    <div class="films-list__container">
      ${generateMovieTemplate(EXTRA_FILMS)}
    </div>
  </section>`
  );
};

