/** @module screens/intro/intro-screen */

import contentPresenter from '../../content-presenter';
import IntroView from './intro-view';


class IntroScreen {
  constructor() {
    this._view = new IntroView();
  }
  init() {
    contentPresenter.change(this._view);
  }
}

export default new IntroScreen();
