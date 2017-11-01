/** @module game/game-model */

import gameSettings from '../config/game-settings';
import {raiseEvent} from "../helpers/event-helper";
import {initialGameStateData, gameProgressEncoder} from "../data/game-data";
import levelsFactory from '../data/levels-factory';
import GameStateModel from './models/game-state-model';
import Timer from '../logic/timer';

const {TotalCount} = gameSettings;


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
  // get result() {
  //   this._result = createGameResult(this._state);
  //   return this._result;
  // }
  get progress() {
    const progressData = {
      player: this._state.player,
      livesCount: this._state.livesCount,
      answers: this._state.answers.map((answer) => answer.resultCode),
    };
    return gameProgressEncoder.encode(progressData);
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
