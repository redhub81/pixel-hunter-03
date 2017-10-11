/** @module scoring */

import gameConventions from '../config/game-conventions.js';
import gameSettings from "../config/game-settings.js";

/**
 * Подсчитывает очки при окончании игры.
 * @param {Array.<object>} userResponses - Массив ответов пользователя.
 * @param {number} livesCount - Количество оставшихся жизней.
 * @return {object} - Количество набранных очков.
 */
const getCompletionScore = (userResponses, livesCount) => {
  if (!userResponses || userResponses.length < gameSettings.totalQuestionsCount) {
    return gameConventions.scoreLimits.gameFailed;
  }
  if (!livesCount || livesCount < 1) {
    return gameConventions.scoreLimits.gameFailed;
  }

  let points = userResponses.reduce((a, response) => {
    a += response.isRight
      ? gameSettings.scoreRates.response.right + gameSettings.scoreRates.speedBonus[response.speed]
      : gameSettings.scoreRates.response.wrong;
    return a;
  }, 0);
  points += gameSettings.scoreRates.liveBonus.savedLive * livesCount;

  return points;
};

/* Экспорт интерфейса модуля.
 *************************************************************************************************/

export default {
  /**
   * Подсчитывает очки при окончании игры.
   * @function
   * @param Array.<object> userResponses - Массив ответов пользователя.
   * @param {number} livesCount - Количество оставшихся жизней.
   * @return {number} - Количество набранных очков.
   */
  getCompletionScore
};
