/** @module screens/intro */

import contentPresenter from '../../content-presenter.js';
import IntroView from './intro-view.js';
import Application from "../../application.js";

class IntroScreen {
  constructor() {
    this._view = new IntroView();
  }
  init() {
    contentPresenter.change(this._view);
    this._view.onAsteriskClicked = () => {
      Application.showGreeting();
    };
  }
}

export default new IntroScreen();
