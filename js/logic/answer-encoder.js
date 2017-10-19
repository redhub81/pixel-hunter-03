/** @module logic/answer-encoder */

import gameConventions from '../config/game-conventions.js';

export default {
  encode: (answers) => answers.reduce((acc, answer) => {
    acc <<= 1;
    acc += gameConventions.imageCode[answer];
    return acc;
  }, 0)
};
