/** @module config/game-conventions */

/**
 * Соглашения принятые в игре.
 * @namespace
 */
const GAME_CONVENTIONS = {
  /** Количество очков при завершении игры.
   * @namespace
   */
  scoreLimits: {
    /** Количество очков в случае проигрыша.
     * @type {number}
     */
    gameFailed: -1,
    /** Минимальное количество очков.
     * @type {number}
     */
    minimum: 0,
  },
  /** Типы результатов игры.
   * @enum {string}
   */
  resultType: {
    /** Правильный результат. */
    right: `right`,
    /** Неверный результат. */
    wrong: `wrong`,
  },
  /** Скорость ответа.
   * @enum {string}
   */
  speedType: {
    /** Нормальная скорость. */
    normal: `normal`,
    /** Быстрый ответ. */
    fast: `fast`,
    /** Медленный ответ. */
    slow: `slow`,
  },
  /** Типы изображений.
   * @enum {string}
   */
  imageType: {
    /** Фото */
    photo: `photo`,
    painting: `painting`,
  },
  /** Типы уровней.
   * @enum {number}
   */
  levelType: {
    oneImage: 1,
    twoImages: 2,
    photoAmongImages: 3,
    paintingAmongImages: 4,
  },
  /** Коды изображений.
   * @enum {number}
   */
  imageCode: {
    photo: 0,
    painting: 1,
  }
};

/* Экспорт интерфейса модуля.
 *************************************************************************************************/

/**
 * Соглашения принятые в игре.
 * @type {object}
 * @property {object} scoreRates - Количество очков при завершении игры.
 * @property {number} scoreRates.gameFailed - Количество очков в случае проигрыша.
 * @property {object} speedType - Скорость ответа.
 * @property {number} speedType.normal - Нормальная скорость.
 * @property {number} speedType.fast - Быстрый ответ.
 * @property {number} speedType.slow - Медленный ответ.
 */
export default GAME_CONVENTIONS;
