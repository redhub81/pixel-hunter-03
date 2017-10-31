/** @module game/game-data */

import gameSettings from '../config/game-settings.js';

const {TotalCount} = gameSettings;

export const initialGameStateData = {
  playerName: ``,
  levelNumber: 0,
  time: TotalCount.TIME,
  livesCount: TotalCount.LIVES,
  answers: []
};

const getFieldData = (value, length, char = `0`) => {
  let strValue = value.toString();
  if (strValue.length === length) {
    return strValue;
  }
  if (strValue.length < length) {
    strValue = `${(new Array(1 + length - strValue.length)).join(char)}${strValue}`;
  }
  return strValue.slice(-length);
};

const gameStateFields = {
  levelNumber: 2,
  time: 2,
  livesCount: 1,
};

export const gameStateEncoder = {
  encode: (data) => {
    const fieldsData = Object.keys(gameStateFields)
        .map((key) => getFieldData(data[key], gameStateFields[key]))
        .reduce((s, it) => {
          return s + it;
        }, ``);
    return `${data.playerName}-${fieldsData}`;
  },
  decode: (code) => {
    const parts = code.split(`-`);
    const state = {playerName: parts[0]};
    let fieldsData = parts[1];
    Object.keys(gameStateFields)
        .forEach((key) => {
          const part = fieldsData.substr(0, gameStateFields[key]);
          state[key] = parseInt(part, 10);
          fieldsData = fieldsData.substr(gameStateFields[key]);
        });
    state.answers = [];
    return state;
  }
};


const livesFieldEncoder = {
  name: `livesCount`, 
  itemSize: 1,
  encode: (data) => getFieldData(data, livesFieldEncoder.itemSize),
  decode: (code, data) => {
    data[livesFieldEncoder.name] = code.substr(0, livesFieldEncoder.itemSize);
    return code.substr(length);
  }
};

const answersFieldEncoder = {
  name: `answers`, 
  headSize: 2,
  itemSize: 1,
  encode: (data) => `${getFieldData(answers.length, answersFieldEncoder.headSize)}${answers
    .map((it) => getFieldData(it, answersFieldEncoder.itemSize))}`,
  decode: (code, data) => {
    const head = fieldsCode.substr(0, answersFieldEncoder.headSize);
    const length = parseInt(head, 10);
    answers = new Array(length).fill(null)
      .map((it) => {
        data[answersFieldEncoder.name] = code.substr(0, answersFieldEncoder.itemSize);
        code = code.substr(0, answersFieldEncoder.itemSize);
        return data;
      });
    return code;
  }
};

const gameProgressFieldsEncoders = [livesFieldEncoder, answersFieldEncoder];

export const gameProgressEncoder = {
  encode: (data) => {
    return Object.keys(gameProgressFieldsEncoders)
        .map((it) => it.encode(data[it.name]))
        .join(``);
  }
  decode: (code) => {
    return Object.keys(gameProgressFieldsEncoders)
      .reduce((data, it) => {
        code = it.decode(code, data);
        return data;
      }, {});
  }
};