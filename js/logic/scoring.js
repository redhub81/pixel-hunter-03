/** @module scoring */

import gameConventions from '../config/game-conventions.js';
import gameSettings from "../config/game-settings.js";

/**
 * Подсчитывает очки при окончании игры.
 * @param {Array.<object>} userResponses - Массив ответов пользователя.
 * @param {number} keptLives - Количество оставшихся жизней.
 * @return {object} - Количество набранных очков.
 */
const getCompletionScore = (userResponses, keptLives) => {
  if (!userResponses || userResponses.length < gameSettings.totalQuestionsCount) {
    return gameConventions.scoreLimits.gameFailed;
  }
  if (!keptLives || keptLives < 1) {
    return gameConventions.scoreLimits.gameFailed;
  }

  let totalScore = userResponses.reduce((a, response) => {
    a += (response.isRight ? gameSettings.scoreRates.response.right : gameSettings.scoreRates.response.wrong)
      + gameSettings.scoreRates.speedBonus[response.speed];
    return a;
  }, 0);
  totalScore += gameSettings.scoreRates.liveBonus.keptLive * keptLives;

  return totalScore;
};

/* Экспорт интерфейса модуля.
 *************************************************************************************************/

export default {
  /**
   * Подсчитывает очки при окончании игры.
   * @function
   * @param Array.<object> userResponses - Массив ответов пользователя.
   * @param {number} keptLives - Количество оставшихся жизней.
   * @return {number} - Количество набранных очков.
   */
  getCompletionScore
};
