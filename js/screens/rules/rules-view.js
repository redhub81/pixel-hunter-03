/** @module screens/rules/rules-view */

import AbstractView from '../../abstract-view';
import gameSettings from '../../config/game-settings';
import contentPresenter from '../../content-presenter';
import HeaderView from '../../views/header-view';
import FooterView from '../../views/footer-view';
import {raiseEvent} from '../../helpers/event-helper';

const {TotalCount} = gameSettings;


export default class RulesView extends AbstractView {
  /** Конструктор. */
  constructor() {
    super(null);
  }
  /** Геттер template создает разметку экрана */
  get template() {
    return `\
      <div class="header-container"></div>
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
      </div>
      <div class="footer-container"></div>`;
  }
  /** Выполняет подписку на события. */
  bind() {
    this._headerContainer = this.element.querySelector(`.header-container`);
    this._footerContainer = this.element.querySelector(`.footer-container`);
    this._playerNameInputElement = this.element.querySelector(`input.rules__input`);

    const rulesFormElement = this._element.querySelector(`.rules__form`);
    const rulesInputElement = rulesFormElement.querySelector(`.rules__input`);
    const rulesButtonElement = rulesFormElement.querySelector(`.rules__button.continue`);

    const isPlayerNameValid = () => {
      return rulesInputElement.value.toString().length > 0;
    };
    this.updateRulesButton = () => {
      rulesButtonElement.disabled = !isPlayerNameValid();
    };

    rulesInputElement.addEventListener(`input`, () => this.updateRulesButton());

    rulesFormElement.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      if (!isPlayerNameValid()) {
        return;
      }
      const data = {
        playerName: rulesInputElement.value.toString()
      };
      raiseEvent(this.onResponse, data);
    });
  }
  update() {
    this.updateHeader();
    this.updateFooter();
  }
  updateHeader() {
    const headerView = new HeaderView(null);
    contentPresenter.change(headerView, this._headerContainer);
    this._headerView = headerView;
    this._headerView.onBackClicked = () => raiseEvent(this.onGoBack);
  }
  updateFooter() {
    const footerView = new FooterView(null);
    contentPresenter.change(footerView, this._footerContainer);
    this._footerView = footerView;
  }
  focus() {
    this._playerNameInputElement.focus();
  }
  set playerName(value) {
    this._playerNameInputElement.value = value;
    this.updateRulesButton();
  }
  /** Вызывается в ответ на ввод данных пользователем. */
  onResponse() {
  }
  onGoBack() {
  }
}
