/** @module game/game-model */

import gameConventions from '../config/game-conventions';
import gameSettings from '../config/game-settings';
import {raiseEvent} from "../helpers/event-helper";
import {initialGameStateData} from "../data/game-data";
import levelsFactory from '../data/levels-factory';
import scoring from '../logic/scoring';
import GameStateModel from './models/game-state-model';
import Timer from '../logic/timer';

const {ResultType, ScoreLimits} = gameConventions;
const {TotalCount} = gameSettings;


const createGameResult = function (state) {
  const answers = state.answers;
  const totalPoints = scoring.getCompletionScore(answers, state.livesCount);
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
    result.livesStatistic = scoring.getLivesStatistic(state.livesCount);
  }
  return result;
};

export default class GameModel {
  constructor(levelData = levelsFactory.createLevels()) {
    this._levels = levelData;
    this._state = new GameStateModel();
    this._level = null;
    this._isComplete = false;
    this._result = {};
    this._timer = new Timer(TotalCount.TIME, () => {
      this._state.time = this._timer.ticksCount;
      raiseEvent(this.onTimeout);
    }, (tick) => {
      this._state.time = tick;
    });
  }
  _updateState(stateData) {
    this._state.update(stateData, false);
    this._level = this._levels[this._state.levelNumber];
  }
  get state() {
    return this._state;
  }
  get level() {
    return this._level;
  }
  get isComplete() {
    return this._isComplete;
  }
  get result() {
    return this._result;
  }
  newGame(stateData = initialGameStateData) {
    this._timer.stop();
    this._isComplete = false;
    this._updateState(stateData);
  }
  update(stateData) {
    this._timer.stop();
    this._updateState(stateData);
  }
  completeLevel(answerCode) {
    const state = this._state;
    const timer = this._timer;
    if (this._isComplete) {
      return;
    }
    const isRight = answerCode === this._level.answerCode;
    state.addAnswer(isRight);

    if (!isRight) {
      state.livesCount--;
    }
    const levelNumber = state.levelNumber + 1;
    if (state.livesCount < 0 || levelNumber === this._levels.length) {
      this.completeGame();
      return;
    }

    state.levelNumber = levelNumber;
    state.time = TotalCount.TIME;
    this._level = this._levels[levelNumber];

    timer.ticksCount = TotalCount.TIME;
  }
  completeGame() {
    this._result = createGameResult(this._state);
    this._isComplete = true;
  }
  restartTimer() {
    this._timer.ticksCount = TotalCount.TIME;
    this._timer.start();
  }
  stopTimer() {
    this._timer.stop();
  }
  onTimeout() {
  }
}
