/** @module transition */

import gameConventions from './config/game-conventions.js';
import contentPresenter from './content-presenter.js';
import gameState from './data/game-state.js';
import intro from './screens/intro.js';
import greeting from './screens/greeting.js';
import rules from './screens/rules.js';
import game1 from './screens/game-1.js';
import game2 from './screens/game-2.js';
import game3 from './screens/game-3.js';
import stats from './screens/stats.js';
import header from './parts/header.js';
import footer from './parts/footer.js';

const {LevelType} = gameConventions;


const nextScreenTransitionByScreenName = {
  [intro.name]: () => {
    goToSplashScreen(greeting);
  },
  [greeting.name]: () => {
    goToGameScreen(rules);
  },
  [rules.name]: (data) => {
    gameState.newGame(data.UserName);
    goToNextLevel();
  },
  [game1.name]: (data) => goToNextLevel(data),
  [game2.name]: (data) => goToNextLevel(data),
  [game3.name]: (data) => goToNextLevel(data),
};

const getLevelTypeKey = (levelType) => `level-${levelType}`;
const screenByLevelType = {
  [getLevelTypeKey(LevelType.TYPE_OF_ONE_IMAGE)]: game2,
  [getLevelTypeKey(LevelType.TYPE_OF_TWO_IMAGES)]: game1,
  [getLevelTypeKey(LevelType.PHOTO_AMONG_THREE_IMAGES)]: game3,
  [getLevelTypeKey(LevelType.PAINTING_AMONG_THREE_IMAGES)]: game3,
};

let currentScreen;

/**
 * Выполняет переход к указанному экрану игры.
 * @function
 * @param {object} screen - Целевой игровой экран для перехода.
 * @param {object} model - Модель данных.
 */
const goToSplashScreen = (screen, model) => {
  contentPresenter.clear();
  contentPresenter.show(screen, model);
  contentPresenter.show(footer);
  currentScreen = screen;
};

const goToGameScreen = (screen, model) => {
  contentPresenter.clear();
  contentPresenter.show(header, model);
  contentPresenter.show(screen, model);
  contentPresenter.show(footer);
  currentScreen = screen;
};

const goToStartScreen = () => {
  goToSplashScreen(intro);
};

const goToNextScreen = (data) => {
  const transition = nextScreenTransitionByScreenName[currentScreen.name];
  transition(data);
};

const goToNextLevel = (data) => {
  if (data) {
    gameState.completeLevel(data.answerCode);
  }
  const model = gameState.state;
  if (!model || model.isComplete) {
    goToGameScreen(stats, gameState.results);
    return;
  }

  const levelTypeKey = getLevelTypeKey(model.level.type);
  let nextScreen = screenByLevelType[levelTypeKey];
  screen.onNextLevel = goToNextLevel;

  goToGameScreen(nextScreen, model);
};

const goToIntro = () => {
  goToSplashScreen(greeting);
};

/* Экспорт интерфейса модуля.
 *************************************************************************************************/

export default {
  init: () => {
    intro.onNextScreen = goToNextScreen;
    greeting.onNextScreen = goToNextScreen;

    header.onBackToIntro = goToIntro;
    rules.onNextScreen = goToNextScreen;
    game1.onNextScreen = goToNextScreen;
    game2.onNextScreen = goToNextScreen;
    game3.onNextScreen = goToNextScreen;
  },
  /**
   * Выполняет переход к указанному экрану игры.
   * @function
   * @param {object} screen - Целевой игровой экран для перехода.
   */
  goToStartScreen,
};
