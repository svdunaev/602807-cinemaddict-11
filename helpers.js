
export const generateMovieTemplate = (amount, markuptemplate) => {
  let template = ``;
  for (let i = 0; i < amount; i++) {
    template = template + markuptemplate;
  }
  return template;
};
