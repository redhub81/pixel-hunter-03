/** @module screens/rules */

import Application from "../../application";
import contentPresenter from '../../content-presenter';
import RulesView from './rules-view';
import {initialGameStateData} from '../../data/game-data';
import {gameStateEncoder} from "../../data/game-data";

class RulesScreen {
  constructor() {
    this._view = new RulesView();
  }
  static _decode(state = ``) {
    const parts = state.split(`-`);
    return {playerName: parts[0]};
  }
  init(state) {
    const stateData = RulesScreen._decode(state);
    const view = this._view;
    contentPresenter.change(view);
    view.onResponse = ({playerName}) => {
      const gameStateData = Object.assign({}, initialGameStateData, {playerName});
      const gameStateCode = gameStateEncoder.encode(gameStateData);
      Application.startGame(gameStateCode);
    };
    view.onGoBack = () => {
      Application.showGreeting();
    };
    view.update();
    view.playerName = stateData.playerName;
    view.focus();
  }
}

export default new RulesScreen();
