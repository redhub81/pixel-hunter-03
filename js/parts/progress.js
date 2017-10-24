/** @module parts/stats */

import ProgressView from './progress-view.js';
import gameConventions from '../config/game-conventions.js';
import gameSettings from '../config/game-settings.js';

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

const screen = {
  /** Возвращает шаблон представления прогресса прохождения игры.
   * @param {object} answers - Ответы пользователя.
   * @return {string} - Шаблон части содержимого игрового экрана.
   */
  getTemplate: (answers) => {
    const statuses = getStatuses(answers);
    const view = new ProgressView(statuses);
    return view.template;
  },
  /**
   * Возвращает содержимое представления прогресса прохождения игры.
   * @function
   * @param {object} answers - Ответы пользователя.
   * @return {object} - Содержимое представления прогресса прохождения игры.
   */
  getContent: (answers) => {
    const statuses = getStatuses(answers);
    const view = new ProgressView(statuses);
    return view.element;
  }
};

/* Экспорт интерфейса модуля.
 *************************************************************************************************/

export default screen;
