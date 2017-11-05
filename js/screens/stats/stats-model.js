/** @module screens/stats/stats-model */

import gameConventions from '../../config/game-conventions';
import scoring from '../../logic/scoring';

const {ResultType, ResultCode, SpeedType, ScoreLimits} = gameConventions;


const createGameAnswers = (answerData) => {
  return answerData
      .map((answer) => {
        let speed;
        switch (answer) {
          case ResultCode.FAST:
            speed = SpeedType.FAST;
            break;
          case ResultCode.SLOW:
            speed = SpeedType.SLOW;
            break;
          case ResultCode.CORRECT:
            speed = SpeedType.NORMAL;
            break;
          default:
            speed = SpeedType.UNKNOWN;
            break;
        }
        return {
          resultType: answer === ResultCode.WRONG ? ResultType.WRONG : ResultType.RIGHT,
          speed
        };
      });
};

const createGameResult = ({date, player, livesCount, answers: answersData}) => ({
  date,
  player,
  livesCount,
  answers: createGameAnswers(answersData),
});

const createResultModel = function (gameResult) {
  const answers = gameResult.answers;
  const totalPoints = scoring.getCompletionScore(answers, gameResult.livesCount);
  const isSuccess = totalPoints !== ScoreLimits.FAILED;
  const stats = {
    date: gameResult.date,
    answers,
    resultType: isSuccess
      ? ResultType.RIGHT
      : ResultType.WRONG,
    totalPoints,
    levelsStatistic: {},
    speedStatistic: {},
    livesStatistic: {},
  };
  if (isSuccess) {
    stats.levelsStatistic = scoring.getLevelsStatistic(answers);
    stats.speedStatistic = scoring.getSpeedStatistic(answers);
    stats.livesStatistic = scoring.getLivesStatistic(gameResult.livesCount);
  }
  return stats;
};

class StatsModel {
  constructor() {
    this.clear();
  }
  get results() {
    return this._results;
  }
  clear() {
    this._results = [];
  }
  update(resultsData) {
    this._results = resultsData.map((resultData) => {
      const gameResult = createGameResult(resultData);
      return createResultModel(gameResult);
    });
  }
  orderByDate(direction) {
    this._results.sort((first, second) => {
      return direction * (first.date - second.date);
    });
  }
}

export default StatsModel;
