/** @module screens/game-one-view */

import AbstractView from '../abstract-view';
import gameConventions from '../config/game-conventions.js';
import progress from '../parts/progress.js';

const {ImageType} = gameConventions;


/* Экспорт интерфейса модуля.
 *************************************************************************************************/

/*
 * Представление типа игры с двумя изображениями.
 */
export default class GameOneView extends AbstractView {
  /** Конструктор.
   * @param {object} model - модель данных.
   */
  constructor(model) {
    super(model);
    this._questionNames = ([0, 1]).map((it) => GameOneView._getQuestionName(it));
  }
  static _getQuestionName(number) {
    return `question${number}`;
  }
  static _getOptionTemplate(name, data) {
    return `\
      <div class="game__option">
        <img src="${data.location}" alt="Option 1" width="468" height="458">
        <label class="game__answer game__answer--photo">
          <input name="${name}" type="radio" value="${ImageType.PHOTO}">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input name="${name}" type="radio" value="${ImageType.PAINTING}">
          <span>Рисунок</span>
        </label>
      </div>`;
  }
  /** Геттер template создает разметку экрана. */
  get template() {
    return `\
      <div class="game">
        <p class="game__task">${this.model.level.description}</p>
        <form class="game__content">
          ${GameOneView._getOptionTemplate(this._questionNames[0], this.model.level.images[0])}
          ${GameOneView._getOptionTemplate(this._questionNames[1], this.model.level.images[1])}
        </form>
        <div class="stats">
          ${progress.getTemplate(this.model.answers)}
        </div>
      </div>`;
  }
  /** Выполняет подписку на события. */
  bind() {
    const gameContentElement = this._element.querySelector(`.game__content`);
    gameContentElement.addEventListener(`change`, (evt) => {
      const target = evt.target;
      if (target.type === `radio`) {
        const data = {
          index: this._questionNames.indexOf(target.name),
          value: target.value,
        };
        this.onResponse(data);
      }
    });
  }
  /** Вызывается при переходе на следующий уровень. */
  onResponse() {
  }
}
