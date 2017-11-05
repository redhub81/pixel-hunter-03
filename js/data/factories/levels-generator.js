/** @module data/factories/levels-generator */

import gameConventions from '../../config/game-conventions';
import gameSettings from '../../config/game-settings';
import mathHelper from '../../helpers/math-helper';
import imagesRepository from '../repositories/images-repository';
import answerEncoder from '../encoders/answer-encoder';
import {createLevel} from './levels-factory';

const {LevelType, ImageType} = gameConventions;
const {TotalCount} = gameSettings;
const CREATE_METHOD_PREFIX = `createLevelWithType`;


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
      return imagesRepository.getRandomImage(imageType);
    });

const createDifferentImages = (imageTypes) => {
  const images = [];
  imageTypes.forEach((imageType) => {
    let randomImage = imagesRepository.getRandomImage(imageType);
    while (images.find((img) => img.location === randomImage.location)) {
      randomImage = imagesRepository.getRandomImage(imageType);
    }
    images.push(randomImage);
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

const getLevelGeneratorKey = (levelType) => `${CREATE_METHOD_PREFIX}-${levelType}`;
const levelGeneratorByKey = {
  [getLevelGeneratorKey(LevelType.TYPE_OF_ONE_IMAGE)]: (levelBase) => {
    levelBase.type = LevelType.TYPE_OF_ONE_IMAGE;
    levelBase.description = `Угадай, фото или рисунок?`;

    levelBase.images.length = 0;
    createImagesWithRandomType(1).forEach((it) => levelBase.images.push(it));

    levelBase.answerCode = answerEncoder.encode(levelBase.images.map((it) => it.imageType));

    return levelBase;
  },
  [getLevelGeneratorKey(LevelType.TYPE_OF_TWO_IMAGES)]: (level) => {
    level.type = LevelType.TYPE_OF_TWO_IMAGES;
    level.description = `Угадайте для каждого изображения фото или рисунок?`;

    level.images.length = 0;
    createDifferentImagesWithRandomType(2).forEach((it) => level.images.push(it));

    level.answerCode = answerEncoder.encode(level.images.map((it) => it.imageType));

    return level;
  },
  [getLevelGeneratorKey(LevelType.PHOTO_AMONG_THREE_IMAGES)]: (level) => {
    level.type = LevelType.PHOTO_AMONG_THREE_IMAGES;
    level.description = `Найдите фото среди изображений`;

    level.images.length = 0;
    createImagesWithOneOfTargetTypeOnly(3, ImageType.PHOTO)
        .forEach((it) => level.images.push(it));

    level.answerCode = answerEncoder.encode(level.images.map((it) => it.imageType));

    return level;
  },
  [getLevelGeneratorKey(LevelType.PAINTING_AMONG_THREE_IMAGES)]: (level) => {
    level.type = LevelType.PAINTING_AMONG_THREE_IMAGES;
    level.description = `Найдите рисунок среди изображений`;

    level.images.length = 0;
    createImagesWithOneOfTargetTypeOnly(3, ImageType.PAINTING)
        .forEach((it) => level.images.push(it));

    level.answerCode = answerEncoder.encode(level.images.map((it) => it.imageType));

    return level;
  },
};

export const generateLevels = () => {
  return new Array(TotalCount.QUESTIONS).fill(void 0)
      .map(() => {
        const levelType = getRandomLevelType();
        const levelBase = createLevel();
        const levelGeneratorKey = getLevelGeneratorKey(levelType);
        return levelGeneratorByKey[levelGeneratorKey](levelBase);
      });
};
