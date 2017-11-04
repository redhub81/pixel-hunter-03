/** @module screens/stats/stats-screen */

import gameConventions from '../../config/game-conventions';
import messageRepository from '../../config/message-repository';
import contentPresenter from '../../content-presenter';
import Application from '../../application';
import GameDataLoader from '../../data/server-data-loader';
import {gameProgressEncoder} from '../../data/encoders/progress-encoder';

import StatsModel from './stats-model';
import StatsView from './stats-view';

const {OrderDirection, MessageId} = gameConventions;


class StatsScreen {
  constructor(results) {
    this._model = new StatsModel(results);
    this._view = new StatsView(this._model);
    this._view.onGoBack = () => {
      Application.showGreeting();
    };
  }
  _load(resultData) {
    const playerName = resultData.player.name;
    GameDataLoader.loadPlayerStats(playerName)
        .then((resultCodes) => {
          const resultsData = resultCodes.map(({code, date}) => {
            return gameProgressEncoder.decode(code, false, {date});
          });
          this._update(resultsData);
        })
        .catch((error) => {
          window.console.error(messageRepository.getMessage(MessageId.ERROR_GAME_STATS_NOT_LOADED, {playerName, error}));
          window.console.warn(messageRepository.getMessage(MessageId.WARNING_CONTINUE_APP_OFFLINE));
          const resultsData = resultData.hasResultState ? [resultData] : [];
          this._update(resultsData);
        });
  }
  _update(results, direction = OrderDirection.DESC) {
    this._model.update(results);
    this._model.orderByDate(direction);
    this._view.updateTitle();
    this._view.updateResults();
  }
  init(resultCode) {
    contentPresenter.change(this._view);
    this._view.update();

    const resultData = gameProgressEncoder.decode(resultCode, true, {date: (new Date()).getTime()});
    const playerName = resultData.player ? resultData.player.name : ``;
    if (!playerName) {
      Application.showGreeting();
      return;
    }
    resultData.hasResultState = resultData.livesCount && resultData.answers && true;

    this._load(resultData);
  }
}

export default StatsScreen;
