/** @module screens/intro */

import contentBuilder from '../content-builder.js';


const getScreenTemplate = () => `\
  <div id="main" class="central__content">
    <div id="intro" class="intro">
      <h1 class="intro__asterisk">*</h1>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </div>
  </div>`;

/**
 * Выполняет подписку на события.
 * @param {object} contentElement - Содержимое игрового экрана.
 */
const subscribe = (contentElement) => {
  const asteriskElement = contentElement.querySelector(`.intro__asterisk`);

  asteriskElement.addEventListener(`click`, function () {
    screen.onNextScreen();
  });
};

const screen = {
  name: `intro`,
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
  onNextScreen: () => {}
};

/* Экспорт интерфейса модуля.
 *************************************************************************************************/

export default screen;
