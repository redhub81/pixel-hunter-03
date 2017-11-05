/** @module content-presenter */

const mainContentElement = document.querySelector(`main.central`);


export default {
  /** Оцищает контейнер отображения.
   * @param {object} container - Контейнер отображения.
   */
  clear: (container = mainContentElement) => {
    container.innerHTML = ``;
  },
  /**
   * Отображает игровой экран на странице.
   * @param {object} view - Игровой экран.
   * @param {object} container - Контейнер отображения.
   */
  show: (view, container = mainContentElement) => {
    container.appendChild(view.element);
  },
  /**
   * Отображает игровой экран на странице.
   * @param {object} view - Игровой экран.
   * @param {object} container - Контейнер отображения.
   */
  change: (view, container = mainContentElement) => {
    container.innerHTML = ``;
    container.appendChild(view.element);
  },
  /**
   * Обновляет текстовое содержимое игрового экрана.
   * @param {string} selector - Селектор целевого элемента для обновления.
   * @param {function} callback - Функция обратного вызова, выполняющая обновление целевого элемента.
   */
  update: (selector, callback) => {
    const element = mainContentElement.querySelector(selector);
    callback(element);
  },
};
