/** @module data/server-data-adapter */

import gameConventions from '../config/game-conventions';
import {createImage, createLevel} from './factories/levels-factory';
import answerEncoder from './encoders/answer-encoder';

const {LevelType, ImageType} = gameConventions;


const QuestionType = {
  TWO_OF_TWO: `two-of-two`,
  TINDER_LIKE: `tinder-like`,
  ONE_OF_THREE: `one-of-three`,
};

const AnswerType = {
  PAINTING: `painting`,
  PHOTO: `photo`,
};

const levelFactoryByQuestionType = {
  [QuestionType.TINDER_LIKE]: () => {
    return createLevel(LevelType.TYPE_OF_ONE_IMAGE);
  },
  [QuestionType.TWO_OF_TWO]: () => {
    return createLevel(LevelType.TYPE_OF_TWO_IMAGES);
  },
  [QuestionType.ONE_OF_THREE]: (answersData) => {
    const orderedLevelTypes = [void 0, LevelType.PHOTO_AMONG_THREE_IMAGES, LevelType.PAINTING_AMONG_THREE_IMAGES];
    const levelTypeIndex = answersData.reduce((acc, it) => {
      acc += it.type === AnswerType.PHOTO;
      return acc;
    }, 0);
    const levelType = orderedLevelTypes[levelTypeIndex];
    return createLevel(levelType);
  }
};

const getImageType = (serverImageType) => {
  const imageTypeKey = Object.keys(AnswerType).find((key) => AnswerType[key] === serverImageType);
  return ImageType[imageTypeKey];
};

const convertImage = ({type: typeData, image: imageData}) => {
  const imageType = getImageType(typeData);
  return createImage(imageType, imageData.url, imageData.width, imageData.height);
};

const convertLevel = ({type: typeData, question: questionData, answers: answersData}) => {
  const levelFactory = levelFactoryByQuestionType[typeData];
  const level = levelFactory(answersData);
  level.description = questionData;
  level.images.length = 0;
  answersData.map((it) => convertImage(it)).forEach((it) => level.images.push(it));
  level.answerCode = answerEncoder.encode(level.images.map((it) => it.imageType));
  return level;
};


export const adapt = (serverData) => {
  const levels = serverData.map((it) => convertLevel(it));
  return levels;
};
