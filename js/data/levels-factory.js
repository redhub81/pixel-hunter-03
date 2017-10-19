/** @module game/levels-generator */

import gameConventions from '../config/game-conventions.js';
import gameSettings from '../config/game-settings.js';
import mathHelper from './math-helper';
import imagesRepository from './images-repository.js';
import answerEncoder from '../logic/answer-encoder.js';

const createImage = function (imageType, location) {
  return {
    imageType,
    location,
  };
};

const createLevelBase = function () {
  return {
    type: 0,
    description: ``,
    images: [],
    answerCode: -1,
  };
};

const getRandomLevelType = () => {
  const levelTypeKeys = Object.keys(gameConventions.levelType);
  const levelTypeKeyIndex = mathHelper.getRandomInt(0, levelTypeKeys.length);
  const levelTypeKey = levelTypeKeys[levelTypeKeyIndex];
  return gameConventions.levelType[levelTypeKey];
};

const getRandomImageTypes = (ignorImageType) => {
  const imageTypeKeys = Object.keys(gameConventions.imageType);
  let imageType;
  do {
    const imageTypeKeyIndex = mathHelper.getRandomInt(0, imageTypeKeys.length);
    const imageTypeKey = imageTypeKeys[imageTypeKeyIndex];
    imageType = gameConventions.imageType[imageTypeKey];
  } while (typeof ignorImageType !== `undefined` && imageType === ignorImageType);
  return imageType;
};

const createImagesWithRandomType = (count) => new Array(count).fill(void 0)
    .map(() => {
      const imageType = getRandomImageTypes();
      return createImage(imageType, imagesRepository.getRandomImage(imageType));
    });

const createDifferentImages = (imageTypes) => {
  const images = [];
  imageTypes.forEach((it) => {
    let location = imagesRepository.getRandomImage(it);
    while (images.find((img) => img.location === location)) {
      location = imagesRepository.getRandomImage(it);
    }
    images.push(createImage(it, location));
  });
  return images;
};

const createDifferentImagesWithRandomType = (count) => {
  const imageTypes = new Array(count).fill(void 0)
      .map(() => getRandomImageTypes());
  return createDifferentImages(imageTypes);
};

const createImagesWithOneOfTargetTypeOnly = (count, targetImageType) => {
  let targetAdded = false;
  const lastIndex = count - 1;
  const imageTypes = new Array(count).fill(void 0)
      .map((it, index) => {
        let imageType;
        if (!targetAdded) {
          imageType = index !== lastIndex ? getRandomImageTypes() : targetImageType;
        } else {
          imageType = getRandomImageTypes(targetImageType);
        }
        targetAdded |= imageType === targetImageType;
        return imageType;
      });
  return createDifferentImages(imageTypes);
};


const createMethodPrefix = `createLevelWithType`;
const levelFactory = {
  [`${createMethodPrefix}${gameConventions.levelType.oneImage}`]: (levelBase) => {
    levelBase.type = gameConventions.levelType.oneImage;
    levelBase.description = `Угадай, фото или рисунок?`;

    levelBase.images.length = 0;
    createImagesWithRandomType(1).forEach((it) => levelBase.images.push(it));

    levelBase.answerCode = answerEncoder.encode(levelBase.images.map((it) => it.imageType));

    return levelBase;
  },
  [`${createMethodPrefix}${gameConventions.levelType.twoImages}`]: (levelBase) => {
    levelBase.type = gameConventions.levelType.twoImages;
    levelBase.description = `Угадайте для каждого изображения фото или рисунок?`;

    levelBase.images.length = 0;
    createDifferentImagesWithRandomType(2).forEach((it) => levelBase.images.push(it));

    levelBase.answerCode = answerEncoder.encode(levelBase.images.map((it) => it.imageType));

    return levelBase;
  },
  [`${createMethodPrefix}${gameConventions.levelType.photoAmongImages}`]: (levelBase) => {
    levelBase.type = gameConventions.levelType.photoAmongImages;
    levelBase.description = `Найдите фото среди изображений`;

    levelBase.images.length = 0;
    createImagesWithOneOfTargetTypeOnly(3, gameConventions.imageType.photo)
        .forEach((it) => levelBase.images.push(it));

    levelBase.answerCode = answerEncoder.encode(levelBase.images.map((it) => it.imageType));

    return levelBase;
  },
  [`${createMethodPrefix}${gameConventions.levelType.paintingAmongImages}`]: (levelBase) => {
    levelBase.type = gameConventions.levelType.paintingAmongImages;
    levelBase.description = `Найдите рисунок среди изображений`;

    levelBase.images.length = 0;
    createImagesWithOneOfTargetTypeOnly(3, gameConventions.imageType.painting)
        .forEach((it) => levelBase.images.push(it));

    levelBase.answerCode = answerEncoder.encode(levelBase.images.map((it) => it.imageType));

    return levelBase;
  },
};

export default {
  createLevels: () => {
    return new Array(gameSettings.totalQuestionsCount).fill(void 0)
        .map(() => {
          const levelType = getRandomLevelType();
          const levelBase = createLevelBase();
          return levelFactory[`${createMethodPrefix}${levelType}`](levelBase);
        });
  }
};
