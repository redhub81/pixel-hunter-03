/** @module screens/stats */

import gameConventions from '../config/game-conventions.js';
import gameSettings from '../config/game-settings.js';
import contentBuilder from '../content-builder.js';
import progress from '../parts/progress.js';

const {ResultType, SpeedType} = gameConventions;
const {AnswerScore, SpeedScore, AccuracyScore} = gameSettings;


const getSpeedFastBonusTemplate = (model) => `\
  <tr>
    <td></td>
    <td class="result__extra">Бонус за скорость:</td>
    <td class="result__extra">${model.count}&nbsp;<span class="stats__result stats__result--fast"></span></td>
    <td class="result__points">×&nbsp;${SpeedScore.FAST}</td>
    <td class="result__total">${model.points}</td>
  </tr>`;

const getLiveBonusTemplate = (model) => `\
  <tr>
    <td></td>
    <td class="result__extra">Бонус за жизни:</td>
    <td class="result__extra">${model.count}&nbsp;<span class="stats__result stats__result--alive"></span></td>
    <td class="result__points">×&nbsp;${AccuracyScore.LIVES}</td>
    <td class="result__total">${model.points}</td>
  </tr>`;

const getSpeedSlowFineTemplate = (model) => `\
  <tr>
    <td></td>
    <td class="result__extra">Штраф за медлительность:</td>
    <td class="result__extra">${model.count}&nbsp;<span class="stats__result stats__result--slow"></span></td>
    <td class="result__points">×&nbsp;${Math.abs(SpeedScore.SLOW)}</td>
    <td class="result__total">${model.points}</td>
  </tr>`;

const getTotalPointsTemplate = (model) => `\
  <tr>
    <td colspan="5" class="result__total  result__total--final">${model}</td>
  </tr>`;


const getGameSuccessStatTemplate = (number, model) => `\
  <table class="result__table">
    <tr>
      <td class="result__number">${number}.</td>
      <td colspan="2">
        ${progress.getTemplate(model.answers)}
      </td>
      <td class="result__points">×&nbsp;${AnswerScore.RIGHT}</td>
      <td class="result__total">${model.levelsStatistic[ResultType.RIGHT].points}</td>
    </tr>
    ${model.speedStatistic[SpeedType.FAST].points > 0
    ? getSpeedFastBonusTemplate(model.speedStatistic[SpeedType.FAST]) : ``}
    ${model.livesStatistic.points > 0 ? getLiveBonusTemplate(model.livesStatistic) : ``}
    ${model.speedStatistic[SpeedType.SLOW].points > 0
    ? getSpeedSlowFineTemplate(model.speedStatistic[SpeedType.SLOW]) : ``}
    ${getTotalPointsTemplate(model.totalPoints)}
  </table>`;

const getGameFailedStatTemplate = (number, model) => `\
  <table class="result__table">
    <tr>
      <td class="result__number">${number}.</td>
      <td>
        ${progress.getTemplate(model.answers)}
      </td>
      <td class="result__total"></td>
      <td class="result__total  result__total--final">fail</td>
    </tr>
  </table>`;

const getScreenTemplate = (results) => `\
  <div class="result">
    <h1>${results[0].resultType === ResultType.RIGHT ? `Победа!` : `Поражение!`}</h1>
    ${results
      .map((result, index) => result.resultType === ResultType.RIGHT
        ? getGameSuccessStatTemplate(index + 1, result)
        : getGameFailedStatTemplate(index + 1, result))
      .join(`\n`)}
  </div>`;

const screen = {
  name: `stats`,
  /**
   * Возвращает содержимое игрового экрана.
   * @function
   * @param {object} results - Результаты игр.
   * @return {object} - Содержимое игрового экрана.
   */
  getContent: (results) => {
    const screenTemplate = getScreenTemplate(results);
    return contentBuilder.build(screenTemplate);
  },
  onBackToIntro: () => {},
};

/* Экспорт интерфейса модуля.
 *************************************************************************************************/

export default screen;
