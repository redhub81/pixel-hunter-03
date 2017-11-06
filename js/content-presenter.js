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
      contentPresenter._addClass(it, CssClass.CROSSFADE);
      contentPresenter._addClass(it, CssClass.FADEOUT);
    });
    const element = view.element;
    contentPresenter._addClass(element, CssClass.CROSSFADE);
    contentPresenter._removeClass(element, CssClass.FADEIN);
    contentPresenter._addClass(element, CssClass.FADEINIT);

    container.appendChild(view.element);

    setTimeout(() => {
      contentPresenter._removeClass(element, CssClass.FADEINIT);
      contentPresenter._addClass(element, CssClass.FADEIN);
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
  _addClass: (element, cssClass) => {
    if (element.classList.contains(cssClass)) {
      return;
    }
    element.classList.add(cssClass);
  },
  _removeClass: (element, cssClass) => {
    if (!element.classList.contains(cssClass)) {
      return;
    }
    element.classList.remove(cssClass);
  },
  _clearCrossfade: (element) => {
    contentPresenter._removeClass(element, CssClass.CROSSFADE);
    contentPresenter._removeClass(element, CssClass.FADEOUT);
    contentPresenter._removeClass(element, CssClass.FADEINIT);
    contentPresenter._removeClass(element, CssClass.FADEIN);
  }
};

export default contentPresenter;
