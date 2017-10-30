/** @module screens/stats/stats-screen */

import contentPresenter from '../../content-presenter';
import Application from "../../application";
import StatsModel from "./stats-model";
import StatsView from './stats-view';


class StatsScreen {
  constructor(results) {
    this._model = new StatsModel(results);
    this._view = new StatsView(this._model);
  }
  init(result) {
    if (result) {
      this._model.add(result);
    }
    contentPresenter.change(this._view);
    this._view.onGoBack = () => {
      Application.showGreeting();
    };
    this._view.update();
  }
}

export default StatsScreen;
