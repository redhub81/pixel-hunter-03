/** @module game/game-view */

import contentPresenter from '../content-presenter.js';
import AbstractView from '../abstract-view.js';
import HeaderView from '../views/header-view.js';
import FooterView from '../views/footer-view.js';
import {raiseEvent} from '../helpers/event-helper';


export default class GameView extends AbstractView {
  /** Конструктор.
   * @param {object} model - модель данных.
   * @param {function} levelViewProvider - провадер представления уровня.
   */
  constructor(model, levelViewProvider) {
    super(model);
    this._headerContainer = null;
    this._levelContainer = null;
    this._footerContainer = null;
    this._levelViewProvider = levelViewProvider;
  }
  get template() {
    return `\
      <div class="header-container"></div>
      <div class="level-container"></div>
      <div class="stats-container"></div>
      <div class="footer-container"></div>`;
  }
  bind() {
    this._headerContainer = this.element.querySelector(`.header-container`);
    this._levelContainer = this.element.querySelector(`.level-container`);
    this._footerContainer = this.element.querySelector(`.footer-container`);
    return super.bind();
  }
  update() {
    this.updateHeader();
    this.updateLevel();
    this.updateFooter();
  }
  updateHeader() {
    const headerView = new HeaderView(this._model.state);
    contentPresenter.change(headerView, this._headerContainer);
    headerView.onBackClicked = () => raiseEvent(this.onGoBack);
    this._headerView = headerView;
  }
  updateLevel() {
    const levelView = this._levelViewProvider();
    levelView.onAnswer = (data) => raiseEvent(this.onAnswer, data);
    contentPresenter.change(levelView, this._levelContainer);
    levelView.update();
    this._levelView = levelView;
  }
  updateFooter() {
    const footerView = new FooterView(this._model.state);
    contentPresenter.change(footerView, this._footerContainer);
    this._footerView = footerView;
  }
  updateTime() {
    const time = this._model.state.time;
    this._headerView.updateTimeBar(time);
  }
  beginTimeBlinking() {
    this._headerView.beginTimeBlinking();
  }
  onAnswer() {
  }
  onGoBack() {
  }
}
