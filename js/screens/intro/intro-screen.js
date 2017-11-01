/** @module screens/intro */

import contentPresenter from '../../content-presenter.js';
import IntroView from './intro-view.js';


class IntroScreen {
  constructor() {
    this._view = new IntroView();
  }
  init() {
    contentPresenter.change(this._view);
  }
}

export default new IntroScreen();
