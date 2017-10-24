/** @module screens/game-three */

import GameThreeView from './game-three-view.js';
import gameConventions from '../config/game-conventions.js';
import answerEncoder from '../logic/answer-encoder.js';

const {LevelType, ImageType} = gameConventions;


const screen = {
  /** Возвращает название экрана.
   * @type {string}
   */
  get name() {
    return `game-three`;
  },
  /**
   * Возвращает содержимое игрового экрана.
   * @function
   * @param {object} model - Модель данных.
   * @return {object} - Содержимое игрового экрана.
   */
  getContent: (model) => {
    const levelType = model.level.type;
    const selectTypes = levelType === LevelType.PHOTO_AMONG_THREE_IMAGES
      ? [ImageType.PHOTO, ImageType.PAINTING]
      : [ImageType.PAINTING, ImageType.PHOTO];

    const view = new GameThreeView(model);
    view.onResponse = ({index: targetIndex}) => {
      const answers = [0, 1, 2].map((it, index) => {
        return index === targetIndex ? selectTypes[0] : selectTypes[1];
      });
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
