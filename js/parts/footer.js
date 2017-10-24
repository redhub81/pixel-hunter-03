/** @module parts/footer */

import FooterView from './footer-view.js';


/* Экспорт интерфейса модуля.
 *************************************************************************************************/

export default {
  /**
   * Возвращает футер игрового экрана.
   * @function
   * @param {object} model - Модель данных.
   * @return {object} - Футер игрового экрана.
   */
  getContent: (model) => {
    const view = new FooterView(model);
    return view.element;
  }
};
