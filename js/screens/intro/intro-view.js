/** @module screens/intro/intro-view */

import AbstractView from '../../abstract-view';

export default class IntroView extends AbstractView {
  /** Конструктор. */
  constructor() {
    super(null);
  }
  /** Геттер template создает разметку экрана */
  get template() {
    return `\
      <div class="header-container"/>
      <div id="main" class="central__content">
        <div id="intro" class="intro">
          <h1 class="intro__asterisk">*</h1>
          <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
        </div>
      </div>
      <div class="footer-container"/>`;
  }
  /** Выполняет подписку на события. */
  bind() {
    const asteriskElement = this._element.querySelector(`.intro__asterisk`);

    asteriskElement.addEventListener(`click`, () => {
      this.onAsteriskClicked();
    });
  }
  /** Вызывается при переходе на следующий уровень. */
  onAsteriskClicked() {
  }
}
