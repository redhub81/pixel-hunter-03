/** @module screens/greeting/greeting-view */

import contentPresenter from '../../content-presenter';
import AbstractView from '../../abstract-view';
import FooterView from '../../views/footer-view';

export default class GreetingView extends AbstractView {
  /** Конструктор.
   */
  constructor() {
    super(null);
  }
  /** Геттер template создает разметку экрана */
  get template() {
    return `\
      <div class="greeting central--blur">
        <div class="greeting__logo"><img src="img/logo_big.png" width="201" height="89" alt="Pixel Hunter"></div>
        <h1 class="greeting__asterisk">*</h1>
        <div class="greeting__challenge">
          <h3>Лучшие художники-фотореалисты бросают&nbsp;тебе&nbsp;вызов!</h3>
          <p>Правила игры просты.<br>
            Нужно отличить рисунок&nbsp;от фотографии и сделать выбор.<br>
            Задача кажется тривиальной, но не думай, что все так просто.<br>
            Фотореализм обманчив и коварен.<br>
            Помни, главное — смотреть очень внимательно.</p>
        </div>
        <div class="greeting__continue"><span><img src="img/arrow_right.svg" width="64" height="64" alt="Next"></span></div>
      </div>
      <div class="footer-container"/>`;
  }
  /** Выполняет подписку на события. */
  bind() {
    this._footerContainer = this.element.querySelector(`.footer-container`);

    const continueElement = this.element.querySelector(`.greeting__continue`);
    continueElement.addEventListener(`click`, () => {
      this.onContinue();
    });
  }
  update() {
    this.updateFooter();
  }
  updateFooter() {
    const footerView = new FooterView(null);
    contentPresenter.change(footerView, this._footerContainer);
    this._footerView = footerView;
  }
  /** Вызывается при переходе на следующий уровень. */
  onContinue() {
  }
}
