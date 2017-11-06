/** @module screens/rules/rules-screen */

import Application from '../../application';
import contentPresenter from '../../content-presenter';
import RulesView from './rules-view';

class RulesScreen {
  constructor() {
    this._view = new RulesView();
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
  static _decode(code = ``) {
    const parts = code.split(`-`);
    return {playerName: parts[0]};
  }
}

export default new RulesScreen();
