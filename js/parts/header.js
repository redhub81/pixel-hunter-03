/** @module parts/header */

import contentBuilder from '../content-builder.js';
import gameSettings from '../config/game-settings.js';

const {TotalCount} = gameSettings;


const getBackBar = () => `\
  <div class="header__back">
    <button class="back">
      <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
      <img src="img/logo_small.svg" width="101" height="44">
    </button>
  </div>`;

const getTimeBar = (time) => `\
  <h1 class="game__timer">${time}</h1>`;

const getLivesBar = (livesCount) => `\
  <div class="game__lives">
    ${new Array(TotalCount.LIVES - livesCount)
      .fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`)
      .join(`\n`)}
    ${new Array(livesCount)
      .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`).join(`\n`)}
  </div>`;

const getHeaderTemplate = (model) => `\
  <header class="header">
    ${getBackBar()}
    ${model && typeof model.time !== `undefined` ? getTimeBar(model.time) : ``}
    ${model && typeof model.livesCount !== `undefined` ? getLivesBar(model.livesCount) : ``}
  </header>`;

/**
 * Выполняет подписку на события.
 * @param {object} contentElement - Содержимое игрового экрана.
 */
const subscribe = (contentElement) => {
  const backElement = contentElement.querySelector(`.back`);
  backElement.addEventListener(`click`, function () {
    screen.onBackToIntro();
  });
};

const screen = {
  /**
   * Возвращает хедер игрового экрана.
   * @function
   * @param {object} model - Модель данных.
   * @return {object} - Хедер игрового экрана.
   */
  getContent: (model) => {
    const template = getHeaderTemplate(model);
    const contentElement = contentBuilder.build(template);

    subscribe(contentElement);

    return contentElement;
  },
  onBackToIntro: () => {},
};

/* Экспорт интерфейса модуля.
 *************************************************************************************************/

export default screen;


