/** @module data/images-repository */

import mathHelper from './math-helper.js';
import gameConventions from '../config/game-conventions.js';

const imageSourcePrefix = `imageSource`;
const imageSourcesByType = {
  [`${imageSourcePrefix}${gameConventions.imageType.photo}`]: [
    // People
    `http://i.imgur.com/1KegWPz.jpg`,
    // Animals
    `https://i.imgur.com/DiHM5Zb.jpg`,
    // Nature
    `http://i.imgur.com/DKR1HtB.jpg`
  ],
  [`${imageSourcePrefix}${gameConventions.imageType.painting}`]: [
    // People
    `https://k42.kn3.net/CF42609C8.jpg`,
    // Animals
    `https://k42.kn3.net/D2F0370D6.jpg`,
    // Nature
    `https://k32.kn3.net/5C7060EC5.jpg`
  ],
};

export default {
  loadImages: (onLoadCallback) => {
    onLoadCallback();
  },
  getRandomImage(imageType) {
    const imageSource = imageSourcesByType[`${imageSourcePrefix}${imageType}`];
    const imageIndex = mathHelper.getRandomInt(0, imageSource.length);
    return imageSource[imageIndex];
  }
};
