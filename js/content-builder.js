/** @module content-builder */

export default {
  /**
   * Создает DOM содержимое по шаблону.
   * @function
   * @param {string} template - Шаблон DOM содержимого.
   * @return {object} - Созданное DOM содержимое.
   */
  build: (template) => {
    const templateElement = document.createElement(`div`);
    templateElement.innerHTML = template;

    return templateElement;
  }
};
