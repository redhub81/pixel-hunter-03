/** @module screens/stats-view */

import AbstractView from '../abstract-view';
import gameConventions from '../config/game-conventions.js';
import gameSettings from '../config/game-settings.js';
import progress from '../parts/progress.js';

const {ResultType, SpeedType} = gameConventions;
const {AnswerScore, SpeedScore, AccuracyScore} = gameSettings;


/* Экспорт интерфейса модуля.
 *************************************************************************************************/

export default class StatsView extends AbstractView {
  /** Конструктор.
   * @param {object} model - модель данных.
   */
  constructor(model) {
    super(model);
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
          <td colspan="2">
            ${progress.getTemplate(data.answers)}
          </td>
          <td class="result__points">×&nbsp;${AnswerScore.RIGHT}</td>
          <td class="result__total">${data.levelsStatistic[ResultType.RIGHT].points}</td>
        </tr>
        ${!data.speedStatistic[SpeedType.FAST].points ? `` : StatsView._getSpeedFastBonusTemplate(data.speedStatistic[SpeedType.FAST])}
        ${!data.livesStatistic.points ? `` : StatsView._getLiveBonusTemplate(data.livesStatistic)}
        ${!data.speedStatistic[SpeedType.SLOW].points ? `` : StatsView._getSpeedSlowFineTemplate(data.speedStatistic[SpeedType.SLOW])}
        ${StatsView._getTotalPointsTemplate(data.totalPoints)}
      </table>`;
  }
  static _getGameFailedStatTemplate(number, data) {
    return `\
      <table class="result__table">
        <tr>
          <td class="result__number">${number}.</td>
          <td>
            ${progress.getTemplate(data.answers)}
          </td>
          <td class="result__total"></td>
          <td class="result__total  result__total--final">fail</td>
        </tr>
      </table>`;
  }
  /** Геттер template создает разметку экрана */
  get template() {
    const results = this.model;
    return `\
      <div class="result">
        <h1>${results[0].resultType === ResultType.RIGHT ? `Победа!` : `Поражение!`}</h1>
        ${results
      .map((result, index) => result.resultType === ResultType.RIGHT
        ? StatsView._getGameSuccessStatTemplate(index + 1, result)
        : StatsView._getGameFailedStatTemplate(index + 1, result))
      .join(`\n`)}
      </div>`;
  }
}
