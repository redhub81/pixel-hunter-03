/** @module application */

import gameConventions from './config/game-conventions';
import {initialStateData} from './data/game-data.js';
import imagesRepository from './data/images-repository.js';
import introScreen from './screens/intro/intro-screen.js';
import greetingScreen from './screens/greeting/greeting-screen.js';
import rulesScreen from './screens/rules/rules-screen.js';
import GameScreen from './game/game-screen.js';
import StatsScreen from './screens/stats/stats-screen.js';

const {ScreenId} = gameConventions;


export default class Application {
  constructor() {
    this._showGreetingOnLoad = true;
  }
  static init() {
    Application.routes = {
      [ScreenId.INTRO]: introScreen,
      [ScreenId.GREETING]: greetingScreen,
      [ScreenId.RULES]: rulesScreen,
      [ScreenId.GAME]: new GameScreen(),
      [ScreenId.STATS]: new StatsScreen(),
    };
    Application._instance = new Application();
    imagesRepository.loadImages(() => {
      if (Application._instance._showGreetingOnLoad) {
        Application.showGreeting();
      }
    });
  }
  static showIntro() {
    Application.routes[ScreenId.INTRO].init();
  }
  static showGreeting() {
    Application._instance._showGreetingOnLoad = false;
    Application.routes[ScreenId.GREETING].init();
  }
  static showRules() {
    Application.routes[ScreenId.RULES].init();
  }
  static startGame(playerName) {
    const stateData = Object.assign({}, initialStateData);
    stateData.playerName = playerName;
    Application.routes[ScreenId.GAME].init(stateData);
  }
  static showStats(result) {
    Application.routes[ScreenId.STATS].init(result);
  }
}
