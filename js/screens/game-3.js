/** @module screens/game-3 */

import gameConventions from '../config/game-conventions.js';
import contentBuilder from '../content-builder.js';
import answerEncoder from '../logic/answer-encoder.js';
import progress from '../parts/progress.js';

const {LevelType, ImageType} = gameConventions;


const getOptionTemplate = (model) => `\
  <div class="game__option">
    <img src="${model.location}" alt="Option 1" width="304" height="455">
  </div>`;

const getScreenTemplate = (model) => `\
  <div class="game">
    <p class="game__task">${model.level.description}</p>
    <form class="game__content  game__content--triple">
      ${model.level.images.map((it) => getOptionTemplate(it)).join(`\n`)}
    </form>
    <div class="stats">
      ${progress.getTemplate(model.answers)}
    </div>
  </div>`;

/**
 * Ищет родительский элемент удовлетворяющий условию.
 * @param {object} startChild - Начальный элемент.
 * @param {object} lastParent - Конечный элемент.
 * @param {function} predicate - Предикат, определяющий условие поиска.
 * @return {object} - Найденный удовлетворяющий условию объект, иначе null.
 */
const findParent = function (startChild, lastParent, predicate) {
  let element = startChild;
  while (element && element !== lastParent) {
    if (predicate(element)) {
      return element;
    }
    element = element.parentElement;
  }
  return null;
};

/**
 * Выполняет подписку на события.
 * @param {object} contentElement - Содержимое игрового экрана.
 * @param {object} model - Модель данных.
 */
const subscribe = (contentElement, model) => {
  const gameContentElement = contentElement.querySelector(`.game__content`);
  let mousedownOptionElement;

  const findParentGameOption = (startChild, lastParent) => findParent(startChild, lastParent, (element) =>
    element.classList.contains(`game__option`));

  gameContentElement.addEventListener(`mousedown`, (evt) => {
    mousedownOptionElement = findParentGameOption(evt.target, gameContentElement);
    const onDocumentMouseupHandler = () => {
      document.removeEventListener(`mouseup`, onDocumentMouseupHandler);
      mousedownOptionElement = null;
    };
    document.addEventListener(`mouseup`, onDocumentMouseupHandler);
  });

  gameContentElement.addEventListener(`mouseup`, (evt) => {
    const mouseupOptionElement = findParentGameOption(evt.target, gameContentElement);
    if (mousedownOptionElement && mouseupOptionElement && mousedownOptionElement === mouseupOptionElement) {
      const optionElements = gameContentElement.querySelectorAll(`.game__option`);
      const levelType = model.level.type;
      const selectTypes = levelType === LevelType.PHOTO_AMONG_THREE_IMAGES
        ? [ImageType.PHOTO, ImageType.PAINTING]
        : [ImageType.PAINTING, ImageType.PHOTO];
      const answers = Array.from(optionElements).map((it) => {
        return mouseupOptionElement === it ? selectTypes[0] : selectTypes[1];
      });
      const data = {
        answerCode: answerEncoder.encode(answers)
      };
      screen.onNextScreen(data);
    }
  });
};

const screen = {
  name: `game-3`,
  /**
   * Возвращает содержимое игрового экрана.
   * @function
   * @param {object} model - Модель данных.
   * @return {object} - Содержимое игрового экрана.
   */
  getContent: (model) => {
    const screenTemplate = getScreenTemplate(model);
    const contentElement = contentBuilder.build(screenTemplate);

    subscribe(contentElement, model);

    return contentElement;
  },
  onBackToIntro: () => {},
  onNextScreen: () => {}
};

/* Экспорт интерфейса модуля.
 *************************************************************************************************/

export default screen;
