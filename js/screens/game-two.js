/** @module screens/game-two */

import GameTwoView from './game-two-view.js';
import answerEncoder from '../logic/answer-encoder.js';


const screen = {
  /** Возвращает название экрана.
   * @type {string}
   */
  get name() {
    return `game-two`;
  },
  /**
   * Возвращает содержимое игрового экрана.
   * @function
   * @param {object} model - Модель данных.
   * @return {object} - Содержимое игрового экрана.
   */
  getContent: (model) => {
    const view = new GameTwoView(model);
    view.onResponse = ({value}) => {
      const answers = [value];
      const data = {
        answerCode: answerEncoder.encode(answers)
      };
      screen.onNextScreen(data);
    };
    return view.element;
  },
  onNextScreen: () => {}
};

/* Экспорт интерфейса модуля.
 *************************************************************************************************/

export default screen;
