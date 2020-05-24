import {COUNTRIES} from "../const.js";
import {loremIpsum} from "../const.js";
import {getRandomIntegerNumber, getRandomArrayItem, genertaeRandomArray} from "../utils.js";
import {generateCommentsArray} from "./comment.js";

const genreOptions = [
  `Mystery`,
  `Film-Noir`,
  `Drama`,
  `Comedy`,
  `Action`,
  `Horror`,
  `Western`,
  `Biopic`
];

const directorOptions = [
  `Ang Lee`,
  `Tom Hooper`,
  `Danny Boyle`,
  `Ethan Coen`,
  `Martin Scorsese`,
  `Quentin Tarantino`
];

const actorOptions = [
  `Daniel Day-Lewis`,
  `Anne Hathaway`,
  `Christoph Waltz`,
  `Meryl Streep`,
  `Christopher Plummer`,
  `Natalie Portman`,
  `Colin Firth`,
  `Christian Bale`,
  `Sandra Bullock`,
  `Jeff Bridges`,
  `Sean Penn`,
  `Penélope Cruz`,
  `Marion Cotillard`,
  `Tilda Swinton`
];

const writerOptions = [
  `Taika Waititi`,
  `Bong Joon Ho`,
  `Kenneth Lonergan`,
  `Alejandro G. Inarritu`,
  `Joel and Ethan Coen`,
  `William Monahan`,
  `Pedro Almodóvar`,
  `Quentin Tarantino`
];

const movieTitleOptions = [
  `Made for Each Other`,
  `Popeye the Sailor meets Sinbad the Sailor`,
  `Sagebrush Trail`,
  `Santa Claus Conquers the Matrtians`,
  `The Dance of Life`,
  `The Great Flamarion`,
  `The Man with the Golden Arm`
];

const moviePosterOptions = [
  `./images/posters/made-for-each-other.png`,
  `./images/posters/popeye-meets-sinbad.png`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/the-great-flamarion.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`
];

const getRating = (min, max) => {
  let randomNumber = Math.random() * (max - min) + min;
  return randomNumber.toFixed(1);
};

const getRandomReleaseDate = () => {
  const releaseDate = new Date();
  releaseDate.setMonth(getRandomIntegerNumber(0, 11));
  releaseDate.setDate(getRandomIntegerNumber(1, 31));
  releaseDate.setFullYear(getRandomIntegerNumber(1920, 2020));

  return releaseDate;
};

const getRandomDateOfWatching = () => {
  const targetDate = new Date();
  const sign = -1;
  const diffValue = sign * getRandomIntegerNumber(0, 28);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

const formatRuntime = (minutes) => {
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
};

const generateMovie = () => {
  const runtime = getRandomIntegerNumber(40, 195);

  return {
    comments: generateCommentsArray(getRandomIntegerNumber(0, 5)),
    filminfo: {
      title: getRandomArrayItem(movieTitleOptions),
      poster: getRandomArrayItem(moviePosterOptions),
      release: {
        date: getRandomReleaseDate(),
        country: getRandomArrayItem(COUNTRIES),
      },
      totalRating: getRating(1, 10),
      ageRating: `${getRandomIntegerNumber(0, 18)}+`,
      director: getRandomArrayItem(directorOptions),
      writers: genertaeRandomArray(writerOptions),
      actors: genertaeRandomArray(actorOptions),
      runtime: formatRuntime(runtime),
      genre: genertaeRandomArray(genreOptions),
    },
    description: genertaeRandomArray(loremIpsum),
    userDetails: {
      isWatched: Math.random() > 0.5,
      isFavorite: Math.random() > 0.5,
      inWatchlist: Math.random() > 0.5,
      datewatched: getRandomDateOfWatching(),
    },
  };
};

const generateMovies = (count) => {
  return new Array(count).fill(``).map(generateMovie);
};

export {generateMovie, generateMovies};

