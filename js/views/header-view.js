/** @module views/header-view */

import AbstractView from '../abstract-view';
import gameSettings from '../config/game-settings';

const {TotalCount} = gameSettings;


/* Экспорт интерфейса модуля.
 *************************************************************************************************/

export default class HeaderView extends AbstractView {
  /** Конструктор.
   * @param {object} model - модель данных.
   */
  constructor(model) {
    super(model);
  }
  static _getBackBar() {
    return `\
      <div class="header__back">
        <button class="back">
          <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
          <img src="img/logo_small.svg" width="101" height="44">
        </button>
      </div>`;
  }
  static _getTimeBar(time) {
    return `\
      <h1 class="game__timer">${time}</h1>`;
  }
  static _getLivesBar(livesCount) {
    return `\
      <div class="game__lives">
        ${new Array(TotalCount.LIVES - livesCount)
      .fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`)
      .join(`\n`)}
        ${new Array(livesCount)
      .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`).join(`\n`)}
      </div>`;
  }
  /** Геттер template создает разметку экрана */
  get template() {
    return `\
      <header class="header">
        ${HeaderView._getBackBar()}
        ${this.model && typeof this.model.time !== `undefined` ? HeaderView._getTimeBar(this.model.time) : ``}
        ${this.model && typeof this.model.livesCount !== `undefined` ? HeaderView._getLivesBar(this.model.livesCount) : ``}
      </header>`;
  }
  /** Выполняет подписку на события. */
  bind() {
    const backElement = this.element.querySelector(`.back`);
    this._timeElement = this.element.querySelector(`.game__timer`);

    backElement.addEventListener(`click`, () => {
      this.onBackClicked();
    });
  }
  updateTimeBar(value) {
    this._timeElement.textContent = value.toString();
  }
  beginTimeBlinking() {
    this._timeElement.classList.add(`blink`);
  }
  /** Вызывается при переходе на следующий уровень. */
  onBackClicked() {
  }
}
