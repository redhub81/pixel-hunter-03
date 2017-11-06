/** @module data/game-data */

import gameSettings from '../config/game-settings';

const {TotalCount} = gameSettings;

/**
 * Начальное состояние игры.
 * */
export const initialGameStateData = {
  playerName: ``,
  levelNumber: 0,
  time: TotalCount.TIME,
  livesCount: TotalCount.LIVES,
  answers: []
};
