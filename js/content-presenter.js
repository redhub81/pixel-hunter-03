/** @module content-presenter */

const mainContentElement = document.querySelector(`main.central`);

/**
 * Отображает игровой экран на странице.
 * @param {object} screen - Игровой экран.
 */
const show = function (screen) {
  mainContentElement.innerHTML = ``;

  const screenContent = screen.getContent();
  mainContentElement.appendChild(screenContent);
};

/* Экспорт интерфейса модуля.
 *************************************************************************************************/

export default {
  /**
   * Отображает игровой экран на странице.
   * @function
   * @param {object} - Игровой экран.
   */
  show
};
