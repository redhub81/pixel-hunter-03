/** @module screens/stats/stats-screen */

import gameConventions from '../../config/game-conventions';
import gameSettings from '../../config/game-settings';
import contentPresenter from '../../content-presenter';
import Application from "../../application";
import {gameProgressEncoder} from "../../data/game-data";
import scoring from '../../logic/scoring';
import StatsModel from "./stats-model";
import StatsView from './stats-view';

const {ResultType, ResultCode, SpeedType, ScoreLimits} = gameConventions;
const {TotalCount} = gameSettings;


const createGameStatistic = function (gameState) {
  const answers = gameState.answers;
  const totalPoints = scoring.getCompletionScore(answers, gameState.livesCount);
  const isSuccess = totalPoints !== ScoreLimits.FAILED;
  const result = {
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
    result.levelsStatistic = scoring.getLevelsStatistic(answers);
    result.speedStatistic = scoring.getSpeedStatistic(answers);
    result.livesStatistic = scoring.getLivesStatistic(gameState.livesCount);
  }
  return result;
};


class StatsScreen {
  constructor(results) {
    this._model = new StatsModel(results);
    this._view = new StatsView(this._model);
  }
  init(state) {
    const gameState = gameProgressEncoder.decode(state);
    const answers = gameState.answers
        .map((answer) => {
          let speed;
          switch (answer) {
            case ResultCode.FAST: speed = SpeedType.FAST; break;
            case ResultCode.SLOW: speed = SpeedType.SLOW; break;
            case ResultCode.CORRECT: speed = SpeedType.NORMAL; break;
            default: speed = SpeedType.UNKNOWN; break;
          }
          return {
            resultType: answer === ResultCode.WRONG ? ResultType.WRONG : ResultType.RIGHT,
            speed
          };
        });
    const gameResult = {
      player: gameState.player,
      livesCount: gameState.livesCount,
      answers,
    };
    const gameStatistic = createGameStatistic(gameResult);
    if (gameStatistic) {
      this._model.add(gameStatistic);
    }
    contentPresenter.change(this._view);
    this._view.onGoBack = () => {
      Application.showGreeting();
    };
    this._view.update();
  }
}

export default StatsScreen;
