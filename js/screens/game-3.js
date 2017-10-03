/** @module screens/game-3 */

import contentBuilder from '../content-builder.js';
import contentPresenter from '../content-presenter.js';
import stats from './stats.js';
import transition from '../transition.js';

const screenTemplate = `\
  <header class="header">
    <div class="header__back">
      <button class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.svg" width="101" height="44">
      </button>
    </div>
    <h1 class="game__timer">NN</h1>
    <div class="game__lives">
      <img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">
      <img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">
      <img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">
    </div>
  </header>
  <div class="game">
    <p class="game__task">Найдите рисунок среди изображений</p>
    <form class="game__content  game__content--triple">
      <div class="game__option">
        <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option  game__option--selected">
        <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option">
        <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
      </div>
    </form>
    <div class="stats">
      <ul class="stats">
        <li class="stats__result stats__result--wrong"></li>
        <li class="stats__result stats__result--slow"></li>
        <li class="stats__result stats__result--fast"></li>
        <li class="stats__result stats__result--correct"></li>
        <li class="stats__result stats__result--wrong"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--slow"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--fast"></li>
        <li class="stats__result stats__result--unknown"></li>
      </ul>
    </div>
  </div>
  <footer class="footer">
    <a href="https://htmlacademy.ru" class="social-link social-link--academy">HTML Academy</a>
    <span class="footer__made-in">Сделано в <a href="https://htmlacademy.ru" class="footer__link">HTML Academy</a> &copy; 2016</span>
    <div class="footer__social-links">
      <a href="https://twitter.com/htmlacademy_ru" class="social-link  social-link--tw">Твиттер</a>
      <a href="https://www.instagram.com/htmlacademy/" class="social-link  social-link--ins">Инстаграм</a>
      <a href="https://www.facebook.com/htmlacademy" class="social-link  social-link--fb">Фэйсбук</a>
      <a href="https://vk.com/htmlacademy" class="social-link  social-link--vk">Вконтакте</a>
    </div>
  </footer>`;

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
 */
const subscribe = (contentElement) => {
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
      contentPresenter.show(stats);
    }
  });
};

/* Экспорт интерфейса модуля.
 *************************************************************************************************/

export default {
  /**
   * Возвращает содержимое игрового экрана.
   * @function
   * @return {object} - Содержимое игрового экрана.
   */
  getContent: () => {
    const contentElement = contentBuilder.build(screenTemplate);
    subscribe(contentElement);

    transition.addBackToIntro(contentElement);

    return contentElement;
  }
};
