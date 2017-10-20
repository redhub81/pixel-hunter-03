/** @module screens/game-2 */

import gameConventions from '../config/game-conventions.js';
import contentBuilder from '../content-builder.js';
import answerEncoder from '../logic/answer-encoder.js';
import progress from '../parts/progress.js';

const {ImageType} = gameConventions;


const getScreenTemplate = (model) => `\
  <div class="game">
    <p class="game__task">${model.level.description}</p>
    <form class="game__content  game__content--wide">
      <div class="game__option">
        <img src="${model.level.images[0].location}" alt="Option 1" width="705" height="455">
        <label class="game__answer  game__answer--photo">
          <input name="question1" type="radio" value="${ImageType.PHOTO}">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--wide  game__answer--paint">
          <input name="question1" type="radio" value="${ImageType.PAINTING}">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
    <div class="stats">
      ${progress.getTemplate(model.answers)}
    </div>
  </div>`;

/**
 * Выполняет подписку на события.
 * @param {object} contentElement - Содержимое игрового экрана.
 */
const subscribe = (contentElement) => {
  const gameContentElement = contentElement.querySelector(`.game__content`);
  gameContentElement.addEventListener(`change`, function (evt) {
    const target = evt.target;
    if (target.type === `radio`) {
      const answers = [target.value];
      const data = {
        answerCode: answerEncoder.encode(answers)
      };
      screen.onNextScreen(data);
    }
  });
};

const screen = {
  name: `game-2`,
  /**
   * Возвращает содержимое игрового экрана.
   * @function
   * @param {object} model - Модель данных.
   * @return {object} - Содержимое игрового экрана.
   */
  getContent: (model) => {
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
