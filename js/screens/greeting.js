/** @module screens/greeting */

import GreetingView from './greeting-view.js';

const screen = {
  /** Возвращает название экрана.
   * @type {string}
   */
  get name() {
    return `greeting`;
  },
  /**
   * Возвращает содержимое игрового экрана.
   * @function
   * @param {object} model - Модель данных.
   * @return {object} - Содержимое игрового экрана.
   */
  getContent(model) {
    const view = new GreetingView(model);
    view.onContinueClicked = () => {
      screen.onNextScreen();
    };
    return view.element;
  },
  onNextScreen: () => {}
};


/* Экспорт интерфейса модуля.
 *************************************************************************************************/

export default screen;
