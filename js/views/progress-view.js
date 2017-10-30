/** @module parts/progress-view */

import gameConventions from '../config/game-conventions.js';
import gameSettings from '../config/game-settings.js';
import AbstractView from '../abstract-view';

const {ResultType, SpeedType} = gameConventions;
const {TotalCount} = gameSettings;


const getStatus = (answer) => {
  if (!answer || typeof answer.resultType === `undefined`) {
    return `unknown`;
  }
  if (answer.resultType === ResultType.WRONG) {
    return `wrong`;
  }
  switch (answer.speed) {
    case SpeedType.FAST: return `fast`;
    case SpeedType.SLOW: return `slow`;
    default: return `correct`;
  }
};

const getStatuses = (answers) => {
  const unknownAnswers = new Array(TotalCount.QUESTIONS - answers.length).fill(void 0);
  return answers.concat(unknownAnswers).map(getStatus);
};

export default class ProgressView extends AbstractView {
  /** Конструктор.
   * @param {object} model - модель данных.
   */
  constructor(model) {
    const viewModel = getStatuses(model);
    super(viewModel);
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
