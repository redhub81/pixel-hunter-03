/** @module screens/result-view */

import gameConventions from '../../../config/game-conventions.js';
import AbstractView from '../../../abstract-view';

const {ResultType} = gameConventions;


export default class ResultView extends AbstractView {
  /** Конструктор.
   * @param {object} model - модель данных.
   */
  constructor(model) {
    super(model);
  }
  /** Геттер template создает разметку экрана */
  get template() {
    return `<h1>${this.model.resultType === ResultType.RIGHT ? `Победа!` : `Поражение!`}</h1>`;
  }
}
