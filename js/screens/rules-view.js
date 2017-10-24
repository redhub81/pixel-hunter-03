/** @module screens/rules-view */

import AbstractView from '../abstract-view';
import gameSettings from '../config/game-settings.js';

const {TotalCount} = gameSettings;


export default class RulesView extends AbstractView {
  /** Конструктор. */
  constructor() {
    super(null);
  }
  /** Геттер template создает разметку экрана */
  get template() {
    return `\
      <div class="rules">
        <h1 class="rules__title">Правила</h1>
        <p class="rules__description">Угадай ${TotalCount.QUESTIONS} раз для каждого изображения фото <img
          src="img/photo_icon.png" width="16" height="16"> или рисунок <img
          src="img/paint_icon.png" width="16" height="16" alt="">.<br>
          Фотографиями или рисунками могут быть оба изображения.<br>
          На каждую попытку отводится ${TotalCount.TIME} секунд.<br>
          Ошибиться можно не более ${TotalCount.LIVES} раз.<br>
          <br>
          Готовы?
        </p>
        <form class="rules__form">
          <input class="rules__input" type="text" placeholder="Ваше Имя">
          <button class="rules__button  continue" type="submit" disabled>Go!</button>
        </form>
      </div>`;
  }
  /** Выполняет подписку на события. */
  bind() {
    const rulesFormElement = this._element.querySelector(`.rules__form`);
    const rulesInputElement = rulesFormElement.querySelector(`.rules__input`);
    const rulesButtonElement = rulesFormElement.querySelector(`.rules__button.continue`);

    const isPlayerNameValid = () => {
      return rulesInputElement.value.toString().length > 0;
    };

    rulesInputElement.addEventListener(`input`, function () {
      rulesButtonElement.disabled = !isPlayerNameValid();
    });

    rulesFormElement.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      if (!isPlayerNameValid()) {
        return;
      }
      const data = {
        userName: rulesInputElement.value.toString()
      };
      this.onResponse(data);
    });
  }
  /** Вызывается в ответ на ввод данных пользователем. */
  onResponse() {
  }
}
