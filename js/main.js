// main.js

/**
 * Главный модуль приложения.
 * @type {{run}}
 */
window.main = (function () {
  /**
   * Перечисление кодов клавиш.
   * @readonly
   * @enum {number}
   */
  const KEY_CODE = {
    /** Код клавиши "Стрелка влево". */
    leftArrow: 37,
    /** Код клавиши "Стрелка вправо". */
    rightArrow: 39
  };

  /**
   * Перечисление номеров экранов.
   * @readonly
   * @enum {number}
   */
  const SCREEN_NUMBER = {
    /** Номер неизвестного экрана. */
    unknown: -1,
    /** Номер стартового экрана. */
    start: 0
  };

  /* Инициализация доступа к DOM элементам.
   ******************************************************************************/

  const mainContent = document.querySelector(`main.central`);
  const templates = (function () {
    const templateNames = [`#greeting`, `#rules`, `#game-1`, `#game-2`, `#game-3`, `#stats`];
    return templateNames.map((it) => {
      return document.querySelector(it).content;
    });
  }());

  /* Отображение экранов.
   ******************************************************************************/

  const showScreen = function (screenNumber) {
    const contentTemplate = templates[screenNumber].cloneNode(true);
    mainContent.innerHTML = ``;
    mainContent.appendChild(contentTemplate);
  };

  /* Управление переключением экранов.
   ******************************************************************************/

  let currentScreenNumber = SCREEN_NUMBER.unknown;

  const getPreviousScreenNumber = function () {
    return Math.max(0, currentScreenNumber - 1);
  };

  const getNextScreenNumber = function () {
    return Math.min(templates.length - 1, currentScreenNumber + 1);
  };

  const setCurrentScreenNumber = function (value, callBack) {
    if (currentScreenNumber !== value) {
      currentScreenNumber = value;
      callBack(value);
    }
  };

  const changeScreen = function (screenNumber) {
    setCurrentScreenNumber(screenNumber, (value) => {
      showScreen(value);
    });
  };

  /* Стратегия обработки событий клавиатуры.
   ******************************************************************************/

  const createKeyboardActionID = function (keyCode, altKey) {
    const altCode = altKey ? `ALT` : ``;
    return `KEY-${keyCode}_${altCode}`;
  };

  const keyboardActionStrategy = {
    [`${createKeyboardActionID(KEY_CODE.leftArrow, true)}`]: () => {
      changeScreen(getPreviousScreenNumber());
    },
    [`${createKeyboardActionID(KEY_CODE.rightArrow, true)}`]: () => {
      changeScreen(getNextScreenNumber());
    },
  };

  /* Подписка на события DOM.
   ******************************************************************************/

  const subscribe = function () {
    document.addEventListener(`keydown`, function (evt) {
      const keyboardActionID = createKeyboardActionID(evt.keyCode, evt.altKey);
      const keyboardAction = keyboardActionStrategy[keyboardActionID] || (() => {});
      keyboardAction();
    });
  };

  /* Публикация интерфейса модуля.
   ******************************************************************************/

  return {
    /** Запускает выполнение приложения. */
    run: () => {
      subscribe();
      setTimeout(() => changeScreen(SCREEN_NUMBER.start), 3000);
    }
  };

}());

window.main.run();
