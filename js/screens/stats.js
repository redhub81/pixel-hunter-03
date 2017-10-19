/** @module screens/stats */

import gameConventions from '../config/game-conventions.js';
import gameSettings from '../config/game-settings.js';
import contentBuilder from '../content-builder.js';
import progress from '../parts/progress.js';

const getSpeedFastBonusTemplate = (model) => `\
  <tr>
    <td></td>
    <td class="result__extra">Бонус за скорость:</td>
    <td class="result__extra">${model.count}&nbsp;<span class="stats__result stats__result--fast"></span></td>
    <td class="result__points">×&nbsp;${gameSettings.scoreRates.speedBonus.fast}</td>
    <td class="result__total">${model.points}</td>
  </tr>`;

const getLiveBonusTemplate = (model) => `\
  <tr>
    <td></td>
    <td class="result__extra">Бонус за жизни:</td>
    <td class="result__extra">${model.count}&nbsp;<span class="stats__result stats__result--alive"></span></td>
    <td class="result__points">×&nbsp;${gameSettings.scoreRates.liveBonus.savedLive}</td>
    <td class="result__total">${model.points}</td>
  </tr>`;

const getSpeedSlowFineTemplate = (model) => `\
  <tr>
    <td></td>
    <td class="result__extra">Штраф за медлительность:</td>
    <td class="result__extra">${model.count}&nbsp;<span class="stats__result stats__result--slow"></span></td>
    <td class="result__points">×&nbsp;${Math.abs(gameSettings.scoreRates.speedBonus.slow)}</td>
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
      <td class="result__points">×&nbsp;${gameSettings.scoreRates.response.right}</td>
      <td class="result__total">${model.levelsStatistic[gameConventions.resultType.right].points}</td>
    </tr>
    ${model.speedStatistic[gameConventions.speedType.fast].points > 0
    ? getSpeedFastBonusTemplate(model.speedStatistic[gameConventions.speedType.fast]) : ``}
    ${model.livesStatistic.points > 0 ? getLiveBonusTemplate(model.livesStatistic) : ``}
    ${model.speedStatistic[gameConventions.speedType.slow].points > 0
    ? getSpeedSlowFineTemplate(model.speedStatistic[gameConventions.speedType.slow]) : ``}
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
    <h1>Победа!</h1>
    ${results
      .map((result, index) => result.resultType === gameConventions.resultType.right
        ? getGameSuccessStatTemplate(index + 1, result)
        : getGameFailedStatTemplate(index + 1, result))}
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
