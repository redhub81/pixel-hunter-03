/** @module screens/levels/game-three-view */

import gameConventions from '../../config/game-conventions';
import {raiseEvent} from '../../helpers/event-helper';
import contentPresenter from '../../content-presenter';
import AbstractView from '../../abstract-view';
import ProgressView from "../../views/progress-view";
import answerEncoder from '../../data/encoders/answer-encoder';

const {LevelType, ImageType} = gameConventions;


/*
 * Представление типа игры с тремя изображениями.
 */
export default class GameThreeView extends AbstractView {
  /** Конструктор.
   * @param {object} model - модель данных.
   */
  constructor(model) {
    super(model);
    this._selectTypes = model.level.type === LevelType.PHOTO_AMONG_THREE_IMAGES
      ? [ImageType.PHOTO, ImageType.PAINTING]
      : [ImageType.PAINTING, ImageType.PHOTO];
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
        <img src="${data.src}" alt="Option 1" width="304" height="455">
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
        <div class="stats"></div>
      </div>`;
  }
  /** Выполняет подписку на события. */
  bind() {
    this._statsContainer = this.element.querySelector(`.stats`);

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
        const targetIndex = optionElements.indexOf(mouseupOptionElement);

        const answers = [0, 1, 2].map((it, index) => {
          return index === targetIndex ? this._selectTypes[0] : this._selectTypes[1];
        });
        const data = {
          answerCode: answerEncoder.encode(answers)
        };
        raiseEvent(this.onAnswer, data);
      }
    });
  }
  update() {
    const progressView = new ProgressView(this._model.state.answers);
    contentPresenter.change(progressView, this._statsContainer);
    this._progressView = progressView;
  }
  /** Вызывается при переходе на следующий уровень. */
  onAnswer() {
  }
}
