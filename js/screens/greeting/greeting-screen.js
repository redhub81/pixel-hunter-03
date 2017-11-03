/** @module screens/greeting/greeting-screen */

import contentPresenter from '../../content-presenter';
import GreetingView from './greeting-view';
import Application from '../../application';

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
