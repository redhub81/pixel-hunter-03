/** @module parts/progress-view */

import AbstractView from '../abstract-view';


/* Экспорт интерфейса модуля.
 *************************************************************************************************/

export default class ProgressView extends AbstractView {
  /** Конструктор.
   * @param {object} model - модель данных.
   */
  constructor(model) {
    super(model);
  }
  static _getStatusTemplate(model) {
    return `<li class="stats__result stats__result--${model}"></li>`;
  }
  /** Геттер template создает разметку экрана */
  get template() {
    return `\
      <ul class="stats">
        ${this.model.map(ProgressView._getStatusTemplate).join(`\n`)}
      </ul>`;
  }
}
