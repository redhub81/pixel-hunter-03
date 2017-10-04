/** @module transition */

import contentPresenter from './content-presenter.js';
import greeting from './screens/greeting.js';

/**
 * Добавляет переход на экран приветствия.
 * @param {object} contentElement - Содержимое игрового экрана.
 * @param {string} selector - Селектор активатора перехода.
 */
const addBackToIntroTransition = (contentElement, selector = `.back`) => {
  const backElement = contentElement.querySelector(selector);

  backElement.addEventListener(`click`, function () {
    contentPresenter.show(greeting);
  });
};

/* Экспорт интерфейса модуля.
 *************************************************************************************************/

export default {
  /**
   * Подписывает элемент активатор на переход к экрану вступления.
   * @function
   * @param {object} contentElement - Содержимое игрового экрана.
   * @param {string} selector - Селектор активатора перехода.
   */
  addBackToIntro: addBackToIntroTransition
};
