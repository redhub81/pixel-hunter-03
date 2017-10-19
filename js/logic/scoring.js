/** @module logic/scoring */

import gameConventions from '../config/game-conventions.js';
import gameSettings from "../config/game-settings.js";

/**
 * Подсчитывает очки при окончании игры.
 * @param {Array.<object>} answers - Ответы пользователя.
 * @param {number} livesCount - Количество оставшихся жизней.
 * @return {object} - Количество набранных очков.
 */
const getCompletionScore = (answers, livesCount) => {
  if (!answers || answers.length < gameSettings.totalQuestionsCount) {
    return gameConventions.scoreLimits.gameFailed;
  }
  if (!livesCount || livesCount < 1) {
    return gameConventions.scoreLimits.gameFailed;
  }

  const levelsStatistic = getLevelsStatistic(answers);
  const speedStatistic = getSpeedStatistic(answers);

  let totalPoints = levelsStatistic[gameConventions.resultType.right].points;
  totalPoints += speedStatistic[gameConventions.speedType.fast].points;
  totalPoints += speedStatistic[gameConventions.speedType.slow].points;
  totalPoints += getLivesStatistic(livesCount).points;

  return totalPoints;
};

const getStatistic = (results, statisticKeys, rates) => {
  const statistic = {};
  statisticKeys.forEach((it) => {
    statistic[it] = {count: 0, points: 0};
  });
  results.forEach((it) => statistic[it].count++);
  statisticKeys.forEach((it) => {
    statistic[it].points = statistic[it].count * rates[it];
  });
  return statistic;
};

const getLevelsStatistic = (answers) => {
  const resultTypes = answers.map((it) => it.resultType);
  const statisticKeys = Object.keys(gameConventions.resultType)
      .map((key) => gameConventions.resultType[key]);
  return getStatistic(resultTypes, statisticKeys, gameSettings.scoreRates.response);
};

const getSpeedStatistic = (answers) => {
  const speedTypes = answers.map((it) => it.speed);
  const statisticKeys = Object.keys(gameConventions.speedType)
      .map((key) => gameConventions.speedType[key]);
  return getStatistic(speedTypes, statisticKeys, gameSettings.scoreRates.speedBonus);
};

const getLivesStatistic = (livesCount) => {
  const count = livesCount > 0 ? livesCount : 0;
  return {
    count,
    points: gameSettings.scoreRates.liveBonus.savedLive * count
  };
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
  getCompletionScore,
  getLevelsStatistic,
  getSpeedStatistic,
  getLivesStatistic,
};
