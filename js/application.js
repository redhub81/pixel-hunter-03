/** @module application */

import gameConventions from './config/game-conventions';
import imagesRepository from './data/images-repository.js';
import introScreen from './screens/intro/intro-screen.js';
import greetingScreen from './screens/greeting/greeting-screen.js';
import rulesScreen from './screens/rules/rules-screen.js';
import GameScreen from './game/game-screen.js';
import StatsScreen from './screens/stats/stats-screen.js';

const {ScreenId} = gameConventions;


export default class Application {
  constructor() {
    this._isInitialized = false;
  }
  static init() {
    Application.routes = {
      [ScreenId.GREETING]: greetingScreen,
      [ScreenId.RULES]: rulesScreen,
      [ScreenId.GAME]: new GameScreen(),
      [ScreenId.STATS]: new StatsScreen(),
    };
    Application._instance = new Application();
    window.onhashchange = () => {
      const hashValue = location.hash.replace(`#`, ``);
      const [screenId, state] = hashValue.split(`=`);
      Application._routing({screenId, state});
    };

    Application.showIntro();
    imagesRepository.loadImages(() => {
      if (!Application.instance.isInitialized) {
        Application.showGreeting();
      }
    });
  }
  static get instance() {
    return Application._instance;
  }
  static _routing(routeData) {
    const controller = Application.routes[routeData.screenId];
    if (controller) {
      controller.init(routeData.state);
    }
  }
  static _getHash(screenId, state) {
    const stateHash = state ? `=${state}` : ``;
    return `${screenId}${stateHash}`;
  }
  static showIntro() {
    introScreen.init();
  }
  static showGreeting(state) {
    Application._instance._isInitialized = true;
    location.hash = Application._getHash(ScreenId.GREETING, state);
  }
  static showRules(state) {
    location.hash = Application._getHash(ScreenId.RULES, state);
  }
  static startGame(state) {
    location.hash = Application._getHash(ScreenId.GAME, state);
  }
  static showStats(state) {
    location.hash = Application._getHash(ScreenId.STATS, state);
  }
  get isInitialized() {
    return this._isInitialized;
  }
}
