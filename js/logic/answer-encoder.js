/** @module logic/answer-encoder */

import gameConventions from '../config/game-conventions.js';

const {ImageCode} = gameConventions;


export default {
  encode: (answers) => answers.reduce((acc, answer) => {
    acc <<= 1;
    acc += ImageCode[answer];
    return acc;
  }, 0)
};
