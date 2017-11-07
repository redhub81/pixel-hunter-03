/** @module screens/stats/views/result-view */

import gameConventions from '../../../config/game-conventions';
import gameSettings from '../../../config/game-settings';
import contentPresenter from '../../../content-presenter';
import AbstractView from '../../../abstract-view';
import ProgressView from '../../../views/progress-view';

const {ResultType, SpeedType} = gameConventions;
const {AnswerScore, SpeedScore, AccuracyScore} = gameSettings;


export default class ResultView extends AbstractView {
  /**
   * Конструктор.
   * @param {object} model - модель данных.
   */
  constructor(model) {
    super(model);
  }
  /** Геттер template создает разметку экрана */
  get template() {
    const {result, number} = this.model;
    return `\
      ${result.resultType === ResultType.RIGHT
    ? ResultView._getGameSuccessStatTemplate(number, result)
    : ResultView._getGameFailedStatTemplate(number)}`;
  }
  bind() {
    this._statsContainer = this.element.querySelector(`.stats-container`);
  }
  update() {
    const progressView = new ProgressView(this._model.result.answers);
    contentPresenter.change(progressView, this._statsContainer);
    this._progressView = progressView;
  }
  static _getSpeedFastBonusTemplate(data) {
    return `\
      <tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${data.count}&nbsp;<span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">×&nbsp;${SpeedScore.FAST}</td>
        <td class="result__total">${data.points}</td>
      </tr>`;
  }
  static _getLiveBonusTemplate(data) {
    return `\
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${data.count}&nbsp;<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">×&nbsp;${AccuracyScore.LIVES}</td>
        <td class="result__total">${data.points}</td>
      </tr>`;
  }
  static _getSpeedSlowFineTemplate(data) {
    return `\
      <tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${data.count}&nbsp;<span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">×&nbsp;${Math.abs(SpeedScore.SLOW)}</td>
        <td class="result__total">${data.points}</td>
      </tr>`;
  }
  static _getTotalPointsTemplate(data) {
    return `\
      <tr>
        <td colspan="5" class="result__total  result__total--final">${data}</td>
      </tr>`;
  }
  static _getGameSuccessStatTemplate(number, data) {
    return `\
      <table class="result__table">
        <tr>
          <td class="result__number">${number}.</td>
          <td colspan="2" class="stats-container"></td>
          <td class="result__points">×&nbsp;${AnswerScore.RIGHT}</td>
          <td class="result__total">${data.levelsStatistic[ResultType.RIGHT].points}</td>
        </tr>
        ${!data.speedStatistic[SpeedType.FAST].points ? `` : ResultView._getSpeedFastBonusTemplate(data.speedStatistic[SpeedType.FAST])}
        ${!data.livesStatistic.points ? `` : ResultView._getLiveBonusTemplate(data.livesStatistic)}
        ${!data.speedStatistic[SpeedType.SLOW].points ? `` : ResultView._getSpeedSlowFineTemplate(data.speedStatistic[SpeedType.SLOW])}
        ${ResultView._getTotalPointsTemplate(data.totalPoints)}
      </table>`;
  }
  static _getGameFailedStatTemplate(number) {
    return `\
      <table class="result__table">
        <tr>
          <td class="result__number">${number}.</td>
          <td class="stats-container"></td>
          <td class="result__total"></td>
          <td class="result__total  result__total--final">fail</td>
        </tr>
      </table>`;
  }
}
