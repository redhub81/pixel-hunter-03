/** @module screens/stats */

import StatsView from './stats-view.js';


/* Экспорт интерфейса модуля.
 *************************************************************************************************/

export default {
  /** Возвращает название экрана.
   * @type {string}
   */
  get name() {
    return `stats`;
  },
  /**
   * Возвращает содержимое игрового экрана.
   * @function
   * @param {object} results - Результаты игр.
   * @return {object} - Содержимое игрового экрана.
   */
  getContent: (results) => {
    const view = new StatsView(results);
    return view.element;
  },
};
