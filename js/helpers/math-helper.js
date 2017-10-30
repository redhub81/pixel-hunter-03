/** @module data/math-helper */

export default {
  getRandomInt: (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  }
};
