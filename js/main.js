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

  /**
   * Отображает заданный экран.
   * @param {number} screenNumber - Номер экрана.
   */
  const showScreen = function (screenNumber) {
    const contentTemplate = templates[screenNumber].cloneNode(true);
    mainContent.innerHTML = ``;
    mainContent.appendChild(contentTemplate);
  };

  /* Переключение экранов.
   ******************************************************************************/

  let currentScreenNumber = SCREEN_NUMBER.unknown;

  /**
   * Возвращает номер предыдущего экрана.
   * @return {number} - Номер предыдущего экрана.
   */
  const getPreviousScreenNumber = function () {
    return Math.max(0, currentScreenNumber - 1);
  };

  /**
   * Возвращает номер следующего экрана.
   * @return {number} - Номер следующего экрана.
   */
  const getNextScreenNumber = function () {
    return Math.min(templates.length - 1, currentScreenNumber + 1);
  };

  /**
   * Устанавливает текущий номер экрана.
   * @param {number} value - Устанавливаемый номер экрана.
   * @param {functiuon} callBack - Функция обратного вызова. Вызывается в случае обновления номера экрана.
   */
  const setCurrentScreenNumber = function (value, callBack) {
    if (currentScreenNumber !== value) {
      currentScreenNumber = value;
      callBack(value);
    }
  };

  /**
   * Изменяет отображаемый экран.
   * @param {number} screenNumber - Номер экрана.
   */
  const changeScreen = function (screenNumber) {
    setCurrentScreenNumber(screenNumber, (value) => {
      showScreen(value);
    });
  };

  /* Стратегия обработки событий клавиатуры.
   ******************************************************************************/

  /**
   * Создает идентификатор клавиатурного действия.
   * @param {number} keyCode - Код клавиши.
   * @param {boolean} altKey - Признак нажатия Alt.
   * @return {string} - Идентификатор клавиатурного действия.
   */
  const createKeyboardActionID = function (keyCode, altKey) {
    const altCode = altKey ? `ALT` : ``;
    return `KEY-${keyCode}_${altCode}`;
  };

  /**
   * Сопоставляет действиям их идентификаторы.
   * @type {object}
   */
  const keyboardActionStrategy = {
    [createKeyboardActionID(KEY_CODE.leftArrow, true)]: () => {
      changeScreen(getPreviousScreenNumber());
    },
    [createKeyboardActionID(KEY_CODE.rightArrow, true)]: () => {
      changeScreen(getNextScreenNumber());
    },
  };

  /* Обработка событий DOM.
   ******************************************************************************/

  /**
   * Выполняет подписку на события.
   */
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
