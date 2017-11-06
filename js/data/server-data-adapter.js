/** @module data/server-data-adapter */

import gameConventions from '../config/game-conventions';
import serverData from './server-data';
import {createImage, createLevel} from './factories/levels-factory';
import answerEncoder from './encoders/answer-encoder';

const {LevelType, ImageType} = gameConventions;
const {QuestionType, AnswerType} = serverData;


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

const convertToGameImageType = (serverImageType) => {
  const imageTypeKey = Object.keys(AnswerType).find((key) => AnswerType[key] === serverImageType);
  return ImageType[imageTypeKey];
};

const convertToGameImage = ({type: typeData, image: imageData}) => {
  const imageType = convertToGameImageType(typeData);
  return createImage(imageType, imageData.url, imageData.width, imageData.height);
};

const convertToGameLevel = ({type: typeData, question: questionData, answers: answersData}) => {
  const levelFactory = levelFactoryByQuestionType[typeData];
  const level = levelFactory(answersData);
  level.description = questionData;
  level.images.length = 0;
  answersData.map((it) => convertToGameImage(it)).forEach((it) => level.images.push(it));
  level.answerCode = answerEncoder.encode(level.images.map((it) => it.imageType));
  return level;
};

export const adapt = (data) => {
  return data.map((it) => convertToGameLevel(it));
};
