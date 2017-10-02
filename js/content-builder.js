/** @module content-builder */

/**
 * Создает DOM содержимое по шаблону.
 * @param {string} template - Шаблон DOM содержимого.
 * @return {object} - Созданное DOM содержимое.
 */
const build = function (template) {
  const templateElement = document.createElement(`template`);
  templateElement.innerHTML = template;

  return templateElement.content;
};

/* Экспорт интерфейса модуля.
 *************************************************************************************************/

export default {
  /**
   * Создает DOM содержимое по шаблону.
   * @function
   * @param {string} - Шаблон DOM содержимого.
   * @returns {object} - Созданное DOM содержимое.
   */
  build
};
