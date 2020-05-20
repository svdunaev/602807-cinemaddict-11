import {loremIpsum} from "../const.js";
import {getRandomIntegerNumber, getRandomArrayItem, genertaeRandomArray} from "../utils.js";

const userNames = [
  `Paul Atreides`,
  `Gurney Halleck`,
  `Vladimir Harkonnen`,
  `Samuel Pickwick`,
  `Sam Weller`,
  `Nathaniel Winkle`,
  `Tracy Tupman`,
  `Tony Weller`,
  `Augustus Snodgrass`,
  `Alfred Jingle`
];

const emotionOptions = [
  `../public/images/angry.png`,
  `../public/images/puke.png`,
  `../public/images/sleeping.png`,
  `../public/images/smile.png`,
];

const getRandomCommentDate = () => {
  const targetDate = new Date();
  const sign = -1;
  const diffValue = sign * getRandomIntegerNumber(0, 28);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

const generateComment = () => {
  return ({
    author: getRandomArrayItem(userNames),
    comment: genertaeRandomArray(loremIpsum),
    date: getRandomCommentDate(),
    emotion: getRandomArrayItem(emotionOptions),
  });
};

const generateCommentsArray = (count) => {
  return new Array(count).fill(``).map(generateComment);
};

export {generateComment, generateCommentsArray};
