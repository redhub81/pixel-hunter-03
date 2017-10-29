/** @module screens/rules */

import contentPresenter from '../../content-presenter.js';
import RulesView from './rules-view.js';
import Application from "../../application.js";

class RulesScreen {
  constructor() {
    this._view = new RulesView();
  }
  init() {
    contentPresenter.change(this._view);
    this._view.onResponse = ({playerName}) => {
      Application.startGame(playerName);
    };
    this._view.onGoBack = () => {
      Application.showGreeting();
    };
    this._view.update();
    this._view.focus();
  }
}

export default new RulesScreen();
