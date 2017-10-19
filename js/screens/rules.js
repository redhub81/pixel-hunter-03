/** @module screens/rules */

import contentBuilder from '../content-builder.js';

const getScreenTemplate = () => `\
  <div class="rules">
    <h1 class="rules__title">Правила</h1>
    <p class="rules__description">Угадай 10 раз для каждого изображения фото <img
      src="img/photo_icon.png" width="16" height="16"> или рисунок <img
      src="img/paint_icon.png" width="16" height="16" alt="">.<br>
      Фотографиями или рисунками могут быть оба изображения.<br>
      На каждую попытку отводится 30 секунд.<br>
      Ошибиться можно не более 3 раз.<br>
      <br>
      Готовы?
    </p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Ваше Имя">
      <button class="rules__button  continue" type="submit" disabled>Go!</button>
    </form>
  </div>`;

/**
 * Выполняет подписку на события.
 * @param {object} contentElement - Содержимое игрового экрана.
 */
const subscribe = (contentElement) => {
  const rulesFormElement = contentElement.querySelector(`.rules__form`);
  const rulesInputElement = rulesFormElement.querySelector(`.rules__input`);
  const rulesButtonElement = rulesFormElement.querySelector(`.rules__button.continue`);

  const isPlayerNameValid = () => {
    return rulesInputElement.value.toString().length > 0;
  };

  rulesInputElement.addEventListener(`input`, function () {
    rulesButtonElement.disabled = !isPlayerNameValid();
  });

  rulesFormElement.addEventListener(`submit`, function (evt) {
    evt.preventDefault();
    if (!isPlayerNameValid()) {
      return;
    }
    screen.onNextScreen({
      UserName: rulesInputElement.value.toString()
    });
  });
};

const screen = {
  name: `rules`,
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
  onNextScreen: () => {},
};

/* Экспорт интерфейса модуля.
 *************************************************************************************************/

export default screen;
