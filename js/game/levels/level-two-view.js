/** @module screens/game-two-view */

import gameConventions from '../../config/game-conventions.js';
import contentPresenter from '../../content-presenter.js';
import {raiseEvent} from '../../helpers/event-helper';
import AbstractView from '../../abstract-view.js';
import ProgressView from "../../views/progress-view";
import answerEncoder from '../../data/answer-encoder.js';

const {ImageType} = gameConventions;


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
        <div class="stats"></div>
      </div>`;
  }
  /** Выполняет подписку на события. */
  bind() {
    this._statsContainer = this.element.querySelector(`.stats`);

    const gameContentElement = this._element.querySelector(`.game__content`);
    gameContentElement.addEventListener(`change`, (evt) => {
      const target = evt.target;
      if (target.type === `radio`) {
        const answers = [target.value];
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
