/** @module content-presenter */

const mainContentElement = document.querySelector(`main.central`);


const CROSSFADE_IN_DELAY = 100;
const CssClass = {
  CROSSFADE: `crossfade`,
  FADEOUT: `out`,
  FADEINIT: `init`,
  FADEIN: `in`,
};

const contentPresenter = {
  /**
   * Оцищает контейнер отображения.
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
  crossfade: (view) => {
    const container = mainContentElement;
    const children = [...container.childNodes];
    children.forEach((it) => {
      it.classList.add(CssClass.CROSSFADE, CssClass.FADEOUT);
    });

    const element = view.element;
    element.classList.remove(CssClass.FADEIN);
    element.classList.add(CssClass.CROSSFADE, CssClass.FADEINIT);

    container.appendChild(view.element);

    setTimeout(() => {
      element.classList.remove(CssClass.FADEINIT);
      element.classList.add(CssClass.FADEIN);
    }, CROSSFADE_IN_DELAY);
  },
  /**
   * Отображает игровой экран на странице.
   * @param {object} view - Игровой экран.
   * @param {object} container - Контейнер отображения.
   */
  change: (view, container = mainContentElement) => {
    container.innerHTML = ``;

    const element = view.element;
    contentPresenter._clearCrossfade(element);

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
  _clearCrossfade: (element) => {
    element.classList.remove(CssClass.CROSSFADE, CssClass.FADEOUT, CssClass.FADEINIT, CssClass.FADEIN);
  }
};

export default contentPresenter;
