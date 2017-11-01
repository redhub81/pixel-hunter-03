/** @module screens/rules */

import Application from "../../application";
import contentPresenter from '../../content-presenter';
import RulesView from './rules-view';

class RulesScreen {
  constructor() {
    this._view = new RulesView();
  }
  static _decode(code = ``) {
    const parts = code.split(`-`);
    return {playerName: parts[0]};
  }
  init(state) {
    const stateData = RulesScreen._decode(state);
    const view = this._view;
    contentPresenter.change(view);
    view.onResponse = ({playerName}) => {
      Application.startGame(playerName);
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
