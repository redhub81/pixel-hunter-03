/** @module screens/rules */

import RulesView from './rules-view.js';


const screen = {
  /** Возвращает название экрана.
   * @type {string}
   */
  get name() {
    return `rules`;
  },
  /**
   * Возвращает содержимое игрового экрана.
   * @function
   * @param {object} model - Модель данных.
   * @return {object} - Содержимое игрового экрана.
   */
  getContent(model) {
    const view = new RulesView(model);
    view.onResponse = ({userName}) => {
      screen.onNextScreen({userName});
    };
    return view.element;
  },
  onNextScreen: () => {}
};

/* Экспорт интерфейса модуля.
 *************************************************************************************************/

export default screen;
