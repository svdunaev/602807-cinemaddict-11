import {createMovieTemplate} from "./movieitem.js";
export const generateMovieTemplate = (amount) => {
  let template = ``;
  for (let i = 0; i < amount; i++) {
    template = template + createMovieTemplate();
  }
  return template;
};
