/** @module game/levels/level-one-view */

import gameConventions from '../../config/game-conventions';
import contentPresenter from '../../content-presenter';
import {raiseEvent} from '../../helpers/event-helper';
import answerEncoder from '../../data/encoders/answer-encoder';
import AbstractView from '../../abstract-view';
import ProgressView from '../../views/progress-view';
import ImageViewModel from '../view-models/image-view-model';

const {ImageType} = gameConventions;

/*
 * Представление типа игры с двумя изображениями.
 */
export default class LevelOneView extends AbstractView {
  /** Конструктор.
   * @param {object} model - модель данных.
   */
  constructor(model) {
    super(model);
    this._responses = [];
    this._questionNames = ([0, 1]).map((it) => LevelOneView._getQuestionName(it));
  }
  /** Геттер template создает разметку. */
  get template() {
    return `\
      <div class="game">
        <p class="game__task">${this.model.level.description}</p>
        <form class="game__content">
          ${LevelOneView._getOptionTemplate(this._questionNames[0], new ImageViewModel(this.model.level.images[0], 0))}
          ${LevelOneView._getOptionTemplate(this._questionNames[1], new ImageViewModel(this.model.level.images[1], 1))}
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
  /** Вызывается при ответе пользователя на вопрос задания. */
  onAnswer() {
  }
  static _getQuestionName(number) {
    return `question${number}`;
  }
  static _getOptionTemplate(name, imageVM) {
    return `\
      <div class="game__option">
        <img src="${imageVM.location}" alt="${imageVM.alt}" width="${imageVM.size.width}" height="${imageVM.size.height}">
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
}
