/** @module parts/stats */

import gameConventions from '../config/game-conventions.js';
import gameSettings from '../config/game-settings.js';
import contentBuilder from '../content-builder.js';

const getStatusTemplate = (model) => `<li class="stats__result stats__result--${model}"></li>`;

const getStatusesTemplate = (statuses) => `\
    <ul class="stats">
      ${statuses.map(getStatusTemplate).join(`\n`)}
    </ul>`;

const getStatus = (answer) => {
  if (!answer || answer.isRight === null) {
    return `unknown`;
  }
  if (answer.resultType === gameConventions.resultType.wrong) {
    return `wrong`;
  }
  switch (answer.speed) {
    case gameConventions.speedType.fast: return `fast`;
    case gameConventions.speedType.normal: return `correct`;
    default: return `normal`;
  }
};

const getStatuses = (answers) => {
  const unknownAnswers = new Array(gameSettings.totalQuestionsCount - answers.length).fill(void 0);
  return answers.concat(unknownAnswers).map(getStatus);
};

/* Экспорт интерфейса модуля.
 *************************************************************************************************/

export default {
  getTemplate: (answers) => {
    const statuses = getStatuses(answers);
    return getStatusesTemplate(statuses);
  },
  /**
   * Возвращает содержимое игрового экрана.
   * @function
   * @param {object} answers - Ответы пользователя.
   * @return {object} - Футер игрового экрана.
   */
  getContent: (answers) => {
    const statuses = getStatuses(answers);
    const statusTemplate = getStatusTemplate(statuses);

    return contentBuilder.build(statusTemplate);
  }
};
