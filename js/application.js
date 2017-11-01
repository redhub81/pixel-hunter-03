/** @module application */

import gameConventions from './config/game-conventions';
import imagesRepository from './data/images-repository';
import introScreen from './screens/intro/intro-screen';
import greetingScreen from './screens/greeting/greeting-screen';
import rulesScreen from './screens/rules/rules-screen';
import GameScreen from './game/game-screen';
import StatsScreen from './screens/stats/stats-screen';

const {ScreenId} = gameConventions;


export default class Application {
  static init() {
    Application._routes = {
      [ScreenId.GREETING]: greetingScreen,
      [ScreenId.RULES]: rulesScreen,
      [ScreenId.GAME]: new GameScreen(),
      [ScreenId.STATS]: new StatsScreen(),
    };
    window.onhashchange = () => {
      const routeData = Application._getRouteData();
      Application._routing(routeData);
    };

    Application.showIntro();
    imagesRepository.loadImages(() => {
      const hash = Application._getRouteData();
      Application._routing(hash);
    });
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
}
