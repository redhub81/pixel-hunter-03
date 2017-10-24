/** @module parts/header */

import HeaderView from './header-view.js';


const screen = {
  /**
   * Возвращает хедер игрового экрана.
   * @function
   * @param {object} model - Модель данных.
   * @return {object} - Хедер игрового экрана.
   */
  getContent: (model) => {
    const view = new HeaderView(model);
    view.onBackClicked = () => {
      screen.onBackToIntro();
    };
    return view.element;
  },
  onBackToIntro: () => {},
};

/* Экспорт интерфейса модуля.
 *************************************************************************************************/

export default screen;
