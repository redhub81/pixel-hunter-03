/** @module screens/game-1 */

import contentBuilder from '../content-builder.js';
import answerEncoder from '../logic/answer-encoder.js';
import progress from '../parts/progress.js';

const getOptionTemplate = (name, model) => `
  <div class="game__option">
    <img src="${model.location}" alt="Option 1" width="468" height="458">
    <label class="game__answer game__answer--photo">
      <input name="${name}" type="radio" value="photo">
      <span>Фото</span>
    </label>
    <label class="game__answer game__answer--paint">
      <input name="${name}" type="radio" value="painting">
      <span>Рисунок</span>
    </label>
  </div>`;

const getScreenTemplate = (model) => `\
  <div class="game">
    <p class="game__task">${model.level.description}</p>
    <form class="game__content">
      ${getOptionTemplate(questionNames[0], model.level.images[0])}
      ${getOptionTemplate(questionNames[1], model.level.images[1])}
    </form>
    <div class="stats">
      ${progress.getTemplate(model.answers)}
    </div>
  </div>`;

const getQuestionName = (number) => `question${number}`;
const questionNames = ([1, 2]).map((it) => getQuestionName(it));
let response;

/**
 * Выполняет подписку на события.
 * @param {object} contentElement - Содержимое игрового экрана.
 */
const subscribe = (contentElement) => {
  const gameContentElement = contentElement.querySelector(`.game__content`);
  gameContentElement.addEventListener(`change`, function (evt) {
    const target = evt.target;
    if (target.type === `radio`) {
      response[target.name] = target.value;
    }
    if (Object.keys(response).length === 2) {
      const answers = questionNames.map((it) => response[it]);
      const data = {
        answerCode: answerEncoder.encode(answers)
      };
      screen.onNextScreen(data);
    }
  });
};

const screen = {
  name: `level-1`,
  /**
   * Возвращает содержимое игрового экрана.
   * @function
   * @param {object} model - Модель данных.
   * @return {object} - Содержимое игрового экрана.
   */
  getContent: (model) => {
    response = {};

    const screenTemplate = getScreenTemplate(model);
    const contentElement = contentBuilder.build(screenTemplate);

    subscribe(contentElement);

    return contentElement;
  },
  onBackToIntro: () => {},
  onNextScreen: () => {}
};

/* Экспорт интерфейса модуля.
 *************************************************************************************************/

export default screen;
