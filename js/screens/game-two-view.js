/** @module screens/game-two-view */

import AbstractView from '../abstract-view';
import gameConventions from '../config/game-conventions.js';
import progress from '../parts/progress.js';

const {ImageType} = gameConventions;


/* Экспорт интерфейса модуля.
 *************************************************************************************************/

/*
 * Представление типа игры с одним изображением.
 */
export default class GameTwoView extends AbstractView {
  /** Конструктор.
   * @param {object} model - модель данных.
   */
  constructor(model) {
    super(model);
  }
  /** Геттер template создает разметку экрана. */
  get template() {
    return `\
      <div class="game">
        <p class="game__task">${this.model.level.description}</p>
        <form class="game__content  game__content--wide">
          <div class="game__option">
            <img src="${this.model.level.images[0].location}" alt="Option 1" width="705" height="455">
            <label class="game__answer  game__answer--photo">
              <input name="question1" type="radio" value="${ImageType.PHOTO}">
              <span>Фото</span>
            </label>
            <label class="game__answer  game__answer--wide  game__answer--paint">
              <input name="question1" type="radio" value="${ImageType.PAINTING}">
              <span>Рисунок</span>
            </label>
          </div>
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
          index: 0,
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
