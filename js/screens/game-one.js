/** @module screens/game-one */

import GameOneView from './game-one-view.js';
import answerEncoder from '../logic/answer-encoder.js';


const screen = {
  _responses: [],
  /** Возвращает название экрана.
   * @type {string}
   */
  get name() {
    return `game-one`;
  },
  /**
   * Возвращает содержимое игрового экрана.
   * @function
   * @param {object} model - Модель данных.
   * @return {object} - Содержимое игрового экрана.
   */
  getContent: (model) => {
    screen._responses = [];
    const view = new GameOneView(model);
    view.onResponse = ({index, value}) => {
      screen._responses[index] = value;
      if (Object.keys(screen._responses).length === 2) {
        const answers = screen._responses.slice(0);
        const data = {
          answerCode: answerEncoder.encode(answers)
        };
        screen.onNextScreen(data);
      }
    };
    return view.element;
  },
  onNextScreen: () => {}
};

/* Экспорт интерфейса модуля.
 *************************************************************************************************/

export default screen;
