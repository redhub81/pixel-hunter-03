/** @module game/game-data */

import gameSettings from '../config/game-settings.js';

const {TotalCount} = gameSettings;

export const initialStateData = {
  playerName: ``,
  levelNumber: 0,
  time: TotalCount.TIME,
  livesCount: TotalCount.LIVES,
  answers: []
};
