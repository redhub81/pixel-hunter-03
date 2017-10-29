/** @module game/levels-generator */

import gameConventions from '../config/game-conventions.js';
import gameSettings from '../config/game-settings.js';
import mathHelper from '../helpers/math-helper';
import imagesRepository from './images-repository.js';
import answerEncoder from './answer-encoder.js';

const {LevelType, ImageType} = gameConventions;
const {TotalCount} = gameSettings;
const CREATE_METHOD_PREFIX = `createLevelWithType`;


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
  const levelTypeKeys = Object.keys(LevelType);
  const levelTypeKeyIndex = mathHelper.getRandomInt(0, levelTypeKeys.length);
  const levelTypeKey = levelTypeKeys[levelTypeKeyIndex];
  return LevelType[levelTypeKey];
};

const getRandomImageTypes = (ignorImageType) => {
  const imageTypeKeys = Object.keys(ImageType);
  let imageType;
  do {
    const imageTypeKeyIndex = mathHelper.getRandomInt(0, imageTypeKeys.length);
    const imageTypeKey = imageTypeKeys[imageTypeKeyIndex];
    imageType = ImageType[imageTypeKey];
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

const levelFactory = {
  [`${CREATE_METHOD_PREFIX}${LevelType.TYPE_OF_ONE_IMAGE}`]: (levelBase) => {
    levelBase.type = LevelType.TYPE_OF_ONE_IMAGE;
    levelBase.description = `Угадай, фото или рисунок?`;

    levelBase.images.length = 0;
    createImagesWithRandomType(1).forEach((it) => levelBase.images.push(it));

    levelBase.answerCode = answerEncoder.encode(levelBase.images.map((it) => it.imageType));

    return levelBase;
  },
  [`${CREATE_METHOD_PREFIX}${LevelType.TYPE_OF_TWO_IMAGES}`]: (levelBase) => {
    levelBase.type = LevelType.TYPE_OF_TWO_IMAGES;
    levelBase.description = `Угадайте для каждого изображения фото или рисунок?`;

    levelBase.images.length = 0;
    createDifferentImagesWithRandomType(2).forEach((it) => levelBase.images.push(it));

    levelBase.answerCode = answerEncoder.encode(levelBase.images.map((it) => it.imageType));

    return levelBase;
  },
  [`${CREATE_METHOD_PREFIX}${LevelType.PHOTO_AMONG_THREE_IMAGES}`]: (levelBase) => {
    levelBase.type = LevelType.PHOTO_AMONG_THREE_IMAGES;
    levelBase.description = `Найдите фото среди изображений`;

    levelBase.images.length = 0;
    createImagesWithOneOfTargetTypeOnly(3, ImageType.PHOTO)
        .forEach((it) => levelBase.images.push(it));

    levelBase.answerCode = answerEncoder.encode(levelBase.images.map((it) => it.imageType));

    return levelBase;
  },
  [`${CREATE_METHOD_PREFIX}${LevelType.PAINTING_AMONG_THREE_IMAGES}`]: (levelBase) => {
    levelBase.type = LevelType.PAINTING_AMONG_THREE_IMAGES;
    levelBase.description = `Найдите рисунок среди изображений`;

    levelBase.images.length = 0;
    createImagesWithOneOfTargetTypeOnly(3, ImageType.PAINTING)
        .forEach((it) => levelBase.images.push(it));

    levelBase.answerCode = answerEncoder.encode(levelBase.images.map((it) => it.imageType));

    return levelBase;
  },
};

export default {
  createLevels: () => {
    return new Array(TotalCount.QUESTIONS).fill(void 0)
        .map(() => {
          const levelType = getRandomLevelType();
          const levelBase = createLevelBase();
          return levelFactory[`${CREATE_METHOD_PREFIX}${levelType}`](levelBase);
        });
  }
};
