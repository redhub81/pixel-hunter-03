/** @module transition */

import gameConventions from './config/game-conventions.js';
import gameSettings from './config/game-settings.js';
import contentPresenter from './content-presenter.js';
import gameState from './data/game-state.js';
import intro from './screens/intro.js';
import greeting from './screens/greeting.js';
import rules from './screens/rules.js';
import gameOne from './screens/game-one.js';
import gameTwo from './screens/game-two.js';
import gameThree from './screens/game-three.js';
import stats from './screens/stats.js';
import header from './parts/header.js';
import footer from './parts/footer.js';

const {LevelType} = gameConventions;
const {TimeSteps} = gameSettings;


const nextScreenTransitionByScreenName = {
  [intro.name]: () => {
    goToSplashScreen(greeting, null);
  },
  [greeting.name]: () => {
    goToGameScreen(rules, null);
  },
  [rules.name]: (data) => {
    gameState.onTimeout = () => goToNextLevel({});
    gameState.newGame(data.userName);
    goToNextLevel();
  },
  [gameOne.name]: (data) => goToNextLevel(data),
  [gameTwo.name]: (data) => goToNextLevel(data),
  [gameThree.name]: (data) => goToNextLevel(data),
};

const getLevelTypeKey = (levelType) => `level-${levelType}`;
const screenByLevelType = {
  [getLevelTypeKey(LevelType.TYPE_OF_ONE_IMAGE)]: gameTwo,
  [getLevelTypeKey(LevelType.TYPE_OF_TWO_IMAGES)]: gameOne,
  [getLevelTypeKey(LevelType.PHOTO_AMONG_THREE_IMAGES)]: gameThree,
  [getLevelTypeKey(LevelType.PAINTING_AMONG_THREE_IMAGES)]: gameThree,
};

let currentScreen;

/**
 * Выполняет переход к вспомогательному экрану игры.
 * @function
 * @param {object} screen - Целевой игровой экран для перехода.
 * @param {object} model - Модель данных.
 */
const goToSplashScreen = (screen, model) => {
  contentPresenter.clear();
  contentPresenter.show(screen, model);
  contentPresenter.show(footer, null);
  currentScreen = screen;
};

/**
 * Выполняет переход к указанному игровому экрану.
 * @function
 * @param {object} screen - Целевой игровой экран для перехода.
 * @param {object} model - Модель данных.
 */
const goToGameScreen = (screen, model) => {
  contentPresenter.clear();
  contentPresenter.show(header, model);
  contentPresenter.show(screen, model);
  contentPresenter.show(footer, null);
  currentScreen = screen;

  const viewSelectorToModelMap = {
    [`.game__timer`]: `time`
  };
  if (model && model.onChanged) {
    model.onChanged = ({target}) => {
      const selectors = Object.keys(viewSelectorToModelMap)
          .filter((it) => viewSelectorToModelMap[it] === target);
      selectors.forEach((it) => {
        contentPresenter.update(it, (element) => {
          const time = model.time;
          element.innerText = time.toString();
          if (time === TimeSteps.WARNING) {
            element.classList.add(`blink`);
          }
        });
      });
    };
  }
};

const goToStartScreen = () => {
  goToSplashScreen(intro, null);
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
  goToSplashScreen(greeting, null);
};

/* Экспорт интерфейса модуля.
 *************************************************************************************************/

export default {
  init: () => {
    intro.onNextScreen = goToNextScreen;
    greeting.onNextScreen = goToNextScreen;

    header.onBackToIntro = goToIntro;
    rules.onNextScreen = goToNextScreen;
    gameOne.onNextScreen = goToNextScreen;
    gameTwo.onNextScreen = goToNextScreen;
    gameThree.onNextScreen = goToNextScreen;
  },
  /**
   * Выполняет переход к указанному экрану игры.
   * @function
   * @param {object} screen - Целевой игровой экран для перехода.
   */
  goToStartScreen,
};
