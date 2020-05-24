import {createMovieTemplate} from "../components/movieitem.js";

export const createMostCommentedTemplate = (movies) => {
  const moviesStr = movies.map((movie) => createMovieTemplate(movie));

  return (
    `<section class="films-list--extra">
    <h2 class="films-list__title">Most commented</h2>

    <div class="films-list__container">
      ${moviesStr}
    </div>
  </section>`
  );
};
