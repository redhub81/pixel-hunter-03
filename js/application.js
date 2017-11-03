/** @module application */

import gameConventions from './config/game-conventions';
import GameServer from './config/game-server';
import GameDataLoader from './data/game-data-loader';
import {adapt} from './data/server-data-adapter';
import {generateLevels} from './data/factories/levels-generator';
import imagesRepository from './data/repositories/images-repository';
import introScreen from './screens/intro/intro-screen';
import greetingScreen from './screens/greeting/greeting-screen';
import rulesScreen from './screens/rules/rules-screen';
import GameScreen from './game/game-screen';
import StatsScreen from './screens/stats/stats-screen';

const {ScreenId} = gameConventions;


export default class Application {
  static init(levels) {
    Application._routes = {
      [ScreenId.GREETING]: greetingScreen,
      [ScreenId.RULES]: rulesScreen,
      [ScreenId.GAME]: new GameScreen(levels),
      [ScreenId.STATS]: new StatsScreen(),
    };
    window.onhashchange = () => {
      const routeData = Application._getRouteData();
      Application._routing(routeData);
    };
  }
  static _routing(routeData) {
    const screenPresenter = Application._routes[routeData.screenId];
    const routingStrategy = screenPresenter
      ? () => screenPresenter.init(routeData.state)
      : () => Application.showGreeting();
    routingStrategy();
  }
  static _getRouteData() {
    const hashValue = location.hash.replace(`#`, ``);
    const [screenId, uriCode] = hashValue.split(`=`);
    return {screenId, state: uriCode ? decodeURIComponent(uriCode) : uriCode};
  }
  static _createHash(screenId, state) {
    const stateHash = state ? `=${encodeURIComponent(state)}` : ``;
    return `${screenId}${stateHash}`;
  }
  static showIntro() {
    introScreen.init();
  }
  static showGreeting() {
    location.hash = Application._createHash(ScreenId.GREETING);
  }
  static showRules(playerName) {
    location.hash = Application._createHash(ScreenId.RULES, playerName);
  }
  static startGame(playerName) {
    location.hash = playerName
      ? Application._createHash(ScreenId.GAME, playerName)
      : Application._createHash(ScreenId.RULES);
  }
  static showStats(state) {
    location.hash = Application._createHash(ScreenId.STATS, state);
  }
  static run(gameServer = GameServer.default) {
    Application.showIntro();
    Application._loader = new GameDataLoader(gameServer);
    Application._loader.loadQuestions()
        .then(adapt)
        .then((levels) => Application.init(levels))
        .catch((evt) => {
          window.console.error(evt);
          Application.init(generateLevels());
        })
        .then(() => imagesRepository.loadImages(() => {
          const hash = Application._getRouteData();
          Application._routing(hash);
        }))
        .catch((evt) => {
          window.console.error(evt);
        });
  }
}
