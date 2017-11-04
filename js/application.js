/** @module application */

import gameConventions from './config/game-conventions';
import messageRepository from './config/message-repository';
import GameServer from './config/game-server';
import GameDataLoader from './data/server-data-loader';
import {adapt} from './data/server-data-adapter';
import {generateLevels} from './data/factories/levels-generator';
import {gameProgressEncoder} from "./data/encoders/progress-encoder";
import imagesRepository from './data/repositories/images-repository';
import introScreen from './screens/intro/intro-screen';
import greetingScreen from './screens/greeting/greeting-screen';
import rulesScreen from './screens/rules/rules-screen';
import GameScreen from './game/game-screen';
import StatsScreen from './screens/stats/stats-screen';

const {ScreenId, MessageId} = gameConventions;


export default class Application {
  static init(levels) {
    Application._routes = {
      [ScreenId.GREETING]: greetingScreen,
      [ScreenId.RULES]: rulesScreen,
      [ScreenId.GAME]: new GameScreen(levels),
      [ScreenId.STATS]: new StatsScreen(Application._loader),
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
  static completeGame(result) {
    const playerName = result.player.name;
    const stateResultCode = gameProgressEncoder.encode(result);
    const code = gameProgressEncoder.encode(result, false);
    GameDataLoader.savePlayerStats(playerName, {code})
        .then(() => {
          location.hash = Application._createHash(ScreenId.STATS, stateResultCode);
        })
        .catch((error) => {
          window.console.error(messageRepository.getMessage(MessageId.ERROR_GAME_SAVE, {playerName, error}));
          window.console.warn(messageRepository.getMessage(MessageId.WARNING_CONTINUE_APP_OFFLINE));
          location.hash = Application._createHash(ScreenId.STATS, stateResultCode);
        });
  }
  static showStats(resultCode) {
    location.hash = Application._createHash(ScreenId.STATS, resultCode);
  }
  static run(gameServer = GameServer.default) {
    Application.showIntro();
    GameDataLoader.init(gameServer);
    GameDataLoader.loadQuestions()
        .then(adapt)
        .then((levels) => {
          Application.init(levels);
          return levels;
        })
        .catch((error) => {
          window.console.error(messageRepository.getMessage(MessageId.ERROR_GAME_LEVELS_LOADING, {error}));
          window.console.warn(messageRepository.getMessage(MessageId.WARNING_CONTINUE_APP_OFFLINE));
          Application.init(generateLevels());
        })
        .then((levels) => imagesRepository.loadImages(levels, () => {
          const hash = Application._getRouteData();
          Application._routing(hash);
        }))
        .catch((error) => {
          window.console.error(messageRepository.getMessage(MessageId.ERROR_UNRECOVERABLE));
          window.console.error(messageRepository.getMessage(MessageId.ERROR_GAME_CANNOT_LOAD_DATA, {error}));
        });
  }
}
