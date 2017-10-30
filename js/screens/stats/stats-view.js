/** @module screens/stats-view */

import contentPresenter from '../../content-presenter.js';
import AbstractView from '../../abstract-view';
import HeaderView from '../../views/header-view';
import TitleView from "./views/title-view";
import ResultView from "./views/result-view";
import FooterView from '../../views/footer-view';


export default class StatsView extends AbstractView {
  /** Конструктор.
   * @param {object} model - модель данных.
   */
  constructor(model) {
    super(model);
    this.reportViews = [];
  }
  /** Геттер template создает разметку экрана */
  get template() {
    return `\
      <div class="header-container"></div>
      <div class="result">
        <div class="title-container"></div>
        <div class="results-container"></div>
      </div>
      <div class="footer-container"></div>`;
  }
  /** Выполняет подписку на события. */
  bind() {
    this._headerContainer = this.element.querySelector(`.header-container`);
    this._titleContainer = this.element.querySelector(`.title-container`);
    this._resultsContainer = this.element.querySelector(`.results-container`);
    this._footerContainer = this.element.querySelector(`.footer-container`);
  }
  update() {
    this.updateHeader();
    this.updateTitle();
    this.updateResults();
    this.updateFooter();
  }
  updateHeader() {
    const headerView = new HeaderView(null);
    contentPresenter.change(headerView, this._headerContainer);
    this._headerView = headerView;
    this._headerView.onBackClicked = () => {
      this.onGoBack();
    };
  }
  updateTitle() {
    const titleView = new TitleView(this.model.results[0]);
    contentPresenter.change(titleView, this._titleContainer);
    this._titleView = titleView;
  }
  updateResults() {
    contentPresenter.clear(this._resultsContainer);
    this.reportViews = [];

    const results = this.model.results;
    results.forEach((result, index) => {
      const resultViewModel = {number: index + 1, result};
      const resultView = new ResultView(resultViewModel);
      contentPresenter.show(resultView, this._resultsContainer);
      resultView.update();
      this.reportViews.push(resultView);
    });
  }
  updateFooter() {
    const footerView = new FooterView(null);
    contentPresenter.change(footerView, this._footerContainer);
    this._footerView = footerView;
  }
  onGoBack() {
  }
}
