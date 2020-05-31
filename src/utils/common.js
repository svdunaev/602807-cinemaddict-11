import {MONTH_NAMES} from "../const.js";

export const formatDate = (date) => {
  let day = date.getDate();
  let year = date.getFullYear();
  let monthIndex = date.getMonth();

  return `${day} ${MONTH_NAMES[monthIndex]} ${year}`;
};

export const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

export const genertaeRandomArray = (arr) => {

  const randomArray = [];

  for (let i = 0; i <= 3; i++) {
    let randomIndex = Math.round(Math.random() * arr.length);
    randomArray.push(arr[randomIndex]);
  }
  return randomArray;
};
