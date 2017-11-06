/** @module game/game-screen */

import gameConventions from '../config/game-conventions';
import gameSettings from '../config/game-settings';
import Application from '../application';
import contentPresenter from '../content-presenter';
import GameModel from './game-model';
import GameView from './game-view';
import LevelOneView from './levels/level-one-view';
import LevelTwoView from './levels/level-two-view';
import LevelThreeView from './levels/level-three-view';
import {initialGameStateData} from '../data/game-data';

const {TimeSteps} = gameSettings;
const {LevelType} = gameConventions;


const getLevelTypeKey = (levelType) => `level-${levelType}`;
const screenByLevelType = {
  [getLevelTypeKey(LevelType.TYPE_OF_ONE_IMAGE)]: LevelTwoView,
  [getLevelTypeKey(LevelType.TYPE_OF_TWO_IMAGES)]: LevelOneView,
  [getLevelTypeKey(LevelType.PHOTO_AMONG_THREE_IMAGES)]: LevelThreeView,
  [getLevelTypeKey(LevelType.PAINTING_AMONG_THREE_IMAGES)]: LevelThreeView,
};
const getLevelView = (levelType) => {
  const levelTypeKey = getLevelTypeKey(levelType);
  return screenByLevelType[levelTypeKey];
};

export default class GameScreen {
  constructor(levels) {
    this._stateUpdateByName = {};
    this._stateUpdateByName.time = () => this._updateTime();

    this._model = new GameModel(levels);
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
      this._confirmGoBack();
    };
  }
  _confirmGoBack() {
    // eslint-disable-next-line no-alert
    const isConfirmed = confirm(`Вы действительно хотите прервать игру?`);
    if (isConfirmed) {
      Application.showGreeting();
      return;
    }
    this._model.continueTimer();
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
      Application.completeGame(gameModel.progress);
      return;
    }
    this._view.update();
    this._model.restartTimer();
  }
  init(playerName) {
    const gameStateData = Object.assign({}, initialGameStateData, {playerName});
    this._model.newGame(gameStateData);
    contentPresenter.change(this._view);
    this._goToNextLevel();
  }
}
