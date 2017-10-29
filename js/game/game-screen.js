/** @module game/game-screen */

import gameConventions from '../config/game-conventions.js';
import gameSettings from '../config/game-settings.js';
import Application from '../application.js';
import contentPresenter from '../content-presenter.js';
import GameModel from './game-model.js';
import GameView from './game-view.js';
import levelOneView from './levels/level-one-view.js';
import levelTwoView from './levels/level-two-view.js';
import levelThreeView from './levels/level-three-view.js';
import resultsRepository from '../data/results-repository.js';

const {TimeSteps} = gameSettings;
const {LevelType} = gameConventions;


const getLevelTypeKey = (levelType) => `level-${levelType}`;
const screenByLevelType = {
  [getLevelTypeKey(LevelType.TYPE_OF_ONE_IMAGE)]: levelTwoView,
  [getLevelTypeKey(LevelType.TYPE_OF_TWO_IMAGES)]: levelOneView,
  [getLevelTypeKey(LevelType.PHOTO_AMONG_THREE_IMAGES)]: levelThreeView,
  [getLevelTypeKey(LevelType.PAINTING_AMONG_THREE_IMAGES)]: levelThreeView,
};
const getLevelView = (levelType) => {
  const levelTypeKey = getLevelTypeKey(levelType);
  return screenByLevelType[levelTypeKey];
};

export default class GameScreen {
  constructor(levelData) {
    this._stateUpdateByName = {};
    this._stateUpdateByName.time = () => this._updateTime();

    this._model = new GameModel(levelData);
    this._view = new GameView(this._model, () => this._createLevelView());

    this._model.state.onChanged = ({target}) => {
      this._updateState(target);
    };
    this._model.onTimeout = () => {
      this._goToNextLevel({});
    };
    this._view.onAnswer = (data) => {
      this._goToNextLevel(data);
    };
    this._view.onGoBack = () => {
      this._model.stopTimer();
      Application.showGreeting();
    };
  }
  _createLevelView() {
    const model = this._model;
    const LevelViewClass = getLevelView(model.level.type);
    return new LevelViewClass(this._model);
  }
  _updateState(target) {
    const updateStateStrategy = this._stateUpdateByName[target];
    if (updateStateStrategy) {
      updateStateStrategy();
    }
  }
  _updateTime() {
    this._view.updateTime();
    const time = this._model.state.time;
    if (time === TimeSteps.WARNING) {
      this._view.beginTimeBlinking();
    }
  }
  _goToNextLevel(data) {
    const gameModel = this._model;
    if (data) {
      gameModel.stopTimer();
      gameModel.completeLevel(data.answerCode);
    }
    if (gameModel.isComplete) {
      resultsRepository.saveResult(gameModel.result);
      Application.showStats(gameModel.result);
      return;
    }
    this._view.update();
    this._model.restartTimer();
  }
  init(stateData) {
    this._model.newGame(stateData);
    contentPresenter.change(this._view);
    this._goToNextLevel();
  }
}
