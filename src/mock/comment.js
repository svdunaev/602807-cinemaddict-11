import {loremIpsum} from "../const.js";
import {getRandomIntegerNumber, getRandomArrayItem, genertaeRandomArray} from "../utils.js";

const userNames = [
  `Samuel Pickwick`,
  `Sam Weller`,
  `Nathaniel Winkle`,
  `Tracy Tupman`,
  `Tony Weller`,
  `Augustus Snodgrass`,
  `Alfred Jingle`
];

const emotionOptions = [
  `./images/emoji/angry.png`,
  `./images/emoji/puke.png`,
  `./images/emoji/sleeping.png`,
  `./images/emoji/smile.png`,
];

const getRandomCommentDate = () => {
  const targetDate = new Date();
  const sign = -1;
  const diffValue = sign * getRandomIntegerNumber(0, 28);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const formatCommentDate = (date) => {
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  let hours = castTimeFormat(date.getHours() % 12);
  let minutes = castTimeFormat(date.getMinutes());

  return `${year}/${month}/${day} ${hours}:${minutes}`;
};

const generateComment = () => {
  return ({
    author: getRandomArrayItem(userNames),
    comment: genertaeRandomArray(loremIpsum),
    commentdate: formatCommentDate(getRandomCommentDate()),
    emotion: getRandomArrayItem(emotionOptions),
  });
};

const generateCommentsArray = (count) => {
  return new Array(count).fill(``).map(generateComment);
};

export {generateComment, generateCommentsArray};
