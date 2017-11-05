/** @module screens/levels/game-one-view */

import gameConventions from '../../config/game-conventions';
import contentPresenter from '../../content-presenter';
import {raiseEvent} from '../../helpers/event-helper';
import answerEncoder from '../../data/encoders/answer-encoder';
import AbstractView from '../../abstract-view';
import ProgressView from "../../views/progress-view";

const {ImageType} = gameConventions;


/*
 * Представление типа игры с двумя изображениями.
 */
export default class GameOneView extends AbstractView {
  /** Конструктор.
   * @param {object} model - модель данных.
   */
  constructor(model) {
    super(model);
    this._responses = [];
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
        const index = this._questionNames.indexOf(target.name);

        this._responses[index] = target.value;
        if (Object.keys(this._responses).length === 2) {
          const answers = this._responses.slice(0);
          const data = {
            answerCode: answerEncoder.encode(answers)
          };
          raiseEvent(this.onAnswer, data);
        }
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
