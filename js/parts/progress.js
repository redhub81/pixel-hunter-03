/** @module parts/stats */

import gameConventions from '../config/game-conventions.js';
import gameSettings from '../config/game-settings.js';
import contentBuilder from '../content-builder.js';

const {ResultType, SpeedType} = gameConventions;
const {TotalCount} = gameSettings;


const getStatusTemplate = (model) => `<li class="stats__result stats__result--${model}"></li>`;

const getStatusesTemplate = (statuses) => `\
    <ul class="stats">
      ${statuses.map(getStatusTemplate).join(`\n`)}
    </ul>`;

const getStatus = (answer) => {
  if (!answer || answer.isRight === null) {
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

/* Экспорт интерфейса модуля.
 *************************************************************************************************/

export default {
  /** Возвращает шаблон представления прогресса прохождения игры.
   * @param {object} answers - Ответы пользователя.
   * @return {object} - Шаблон части содержимого игрового экрана.
   */
  getTemplate: (answers) => {
    const statuses = getStatuses(answers);
    return getStatusesTemplate(statuses);
  },
  /**
   * Возвращает содержимое представления прогресса прохождения игры.
   * @function
   * @param {object} answers - Ответы пользователя.
   * @return {object} - Содержимое представления прогресса прохождения игры.
   */
  getContent: (answers) => {
    const statuses = getStatuses(answers);
    const statusTemplate = getStatusTemplate(statuses);

    return contentBuilder.build(statusTemplate);
  }
};
