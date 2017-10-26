/** @module screens/game-three-view */

import AbstractView from '../abstract-view';
import progress from '../parts/progress.js';


/* Экспорт интерфейса модуля.
 *************************************************************************************************/

/*
 * Представление типа игры с тремя изображениями.
 */
export default class GameThreeView extends AbstractView {
  /** Конструктор.
   * @param {object} model - модель данных.
   */
  constructor(model) {
    super(model);
  }
  /**
   * Ищет родительский элемент удовлетворяющий условию.
   * @param {object} startChild - Начальный элемент.
   * @param {object} lastParent - Конечный элемент.
   * @param {function} predicate - Предикат, определяющий условие поиска.
   * @return {object} - Найденный удовлетворяющий условию объект, иначе null.
   */
  static _findParent(startChild, lastParent, predicate) {
    let element = startChild;
    while (element && element !== lastParent) {
      if (predicate(element)) {
        return element;
      }
      element = element.parentElement;
    }
    return null;
  }
  static _getOptionTemplate(data) {
    return `\
      <div class="game__option">
        <img src="${data.location}" alt="Option 1" width="304" height="455">
      </div>`;
  }
  /** Геттер template создает разметку экрана. */
  get template() {
    return `\
      <div class="game">
        <p class="game__task">${this.model.level.description}</p>
        <form class="game__content  game__content--triple">
          ${this.model.level.images.map((it) => GameThreeView._getOptionTemplate(it)).join(`\n`)}
        </form>
        <div class="stats">
          ${progress.getTemplate(this.model.answers)}
        </div>
      </div>`;
  }
  /** Выполняет подписку на события. */
  bind() {
    const gameContentElement = this._element.querySelector(`.game__content`);
    let mousedownOptionElement;

    const findParentGameOption = (startChild, lastParent) => GameThreeView._findParent(startChild, lastParent, (element) =>
      element.classList.contains(`game__option`));

    gameContentElement.addEventListener(`mousedown`, (evt) => {
      mousedownOptionElement = findParentGameOption(evt.target, gameContentElement);
      const onDocumentMouseupHandler = () => {
        document.removeEventListener(`mouseup`, onDocumentMouseupHandler);
        mousedownOptionElement = null;
      };
      document.addEventListener(`mouseup`, onDocumentMouseupHandler);
    });

    gameContentElement.addEventListener(`mouseup`, (evt) => {
      const mouseupOptionElement = findParentGameOption(evt.target, gameContentElement);
      if (mousedownOptionElement && mouseupOptionElement && mousedownOptionElement === mouseupOptionElement) {
        const optionElements = Array.from(gameContentElement.querySelectorAll(`.game__option`));
        const data = {
          index: optionElements.indexOf(mouseupOptionElement),
          value: ``
        };
        this.onResponse(data);
      }
    });
  }
  /** Вызывается при переходе на следующий уровень. */
  onResponse() {
  }
}
