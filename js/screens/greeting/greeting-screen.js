/** @module screens/greeting */

import contentPresenter from '../../content-presenter.js';
import GreetingView from './greeting-view.js';
import Application from "../../application.js";

class GreetingScreen {
  constructor() {
    this._view = new GreetingView();
  }
  init() {
    contentPresenter.change(this._view);
    this._view.onContinue = () => {
      Application.showRules();
    };
    this._view.update();
  }
}

export default new GreetingScreen();
