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

const getFieldData = (value, length, char) => {
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
        .map((key) => getFieldData(data[key], gameStateFields[key], `0`))
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
