/** @module content-presenter */

const mainContentElement = document.querySelector(`main.central`);

/**
 * Оцищает контейнер отображения.
 */
const clear = function () {
  mainContentElement.innerHTML = ``;
};

/**
 * Отображает игровой экран на странице.
 * @param {object} screen - Игровой экран.
 * @param {object} model - Модель данных.
 */
const show = function (screen, model) {
  const screenContent = screen.getContent(model);
  mainContentElement.appendChild(screenContent);
};

/* Экспорт интерфейса модуля.
 *************************************************************************************************/

export default {
  /**
   * Оцищает контейнер отображения.
   * @function
   */
  clear,
  /**
   * Отображает игровой экран на странице.
   * @function
   * @param {object} screen - Игровой экран.
   * @param {object} model - Модель данных.
   */
  show
};
