/** @module screens/intro */

import IntroView from './intro-view.js';

const screen = {
  /** Возвращает название экрана.
   * @type {string}
   */
  get name() {
    return `intro`;
  },
  /** Возвращает содержимое игрового экрана.
   * @function
   * @param {object} model - Модель данных.
   * @return {object} - Содержимое игрового экрана.
   */
  getContent: (model) => {
    const view = new IntroView(model);
    view.onAsteriskClicked = () => {
      screen.onNextScreen();
    };
    return view.element;
  },
  onNextScreen: () => {}
};

/* Экспорт интерфейса модуля.
 *************************************************************************************************/

export default screen;
