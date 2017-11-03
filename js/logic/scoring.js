/** @module logic/scoring */

import gameConventions from '../config/game-conventions';
import gameSettings from '../config/game-settings';

const {ResultType, SpeedType, ScoreLimits} = gameConventions;
const {TotalCount, AnswerScore, SpeedScore, AccuracyScore} = gameSettings;


/**
 * Подсчитывает очки при окончании игры.
 * @param {Array.<object>} answers - Ответы пользователя.
 * @param {number} livesCount - Количество оставшихся жизней.
 * @return {object} - Количество набранных очков.
 */
const getCompletionScore = (answers, livesCount) => {
  if (!answers || answers.length < TotalCount.QUESTIONS) {
    return ScoreLimits.FAILED;
  }
  if (livesCount < 0) {
    return ScoreLimits.FAILED;
  }
  const levelsStatistic = getLevelsStatistic(answers);
  if (levelsStatistic[ResultType.WRONG].count > TotalCount.LIVES) {
    return ScoreLimits.FAILED;
  }

  const speedStatistic = getSpeedStatistic(answers);

  let totalPoints = levelsStatistic[ResultType.RIGHT].points;
  totalPoints += speedStatistic[SpeedType.FAST].points;
  totalPoints += speedStatistic[SpeedType.SLOW].points;
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
  const statisticKeys = Object.keys(ResultType)
      .map((key) => ResultType[key]);
  return getStatistic(resultTypes, statisticKeys, AnswerScore);
};

const getSpeedStatistic = (answers) => {
  const speedTypes = answers
      .filter((it) => it.resultType === ResultType.RIGHT)
      .map((it) => it.speed);
  const statisticKeys = Object.keys(SpeedType)
      .map((key) => SpeedType[key]);
  return getStatistic(speedTypes, statisticKeys, SpeedScore);
};

const getLivesStatistic = (livesCount) => {
  const count = livesCount > 0 ? livesCount : 0;
  return {
    count,
    points: AccuracyScore.LIVES * count
  };
};

/* Экспорт интерфейса модуля.
 *************************************************************************************************/

export default {
  getCompletionScore,
  getLevelsStatistic,
  getSpeedStatistic,
  getLivesStatistic,
};
