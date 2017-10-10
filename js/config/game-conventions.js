/** @module game-contracts */

/**
 * Соглашения принятые в игре.
 * @namespace
 */
const gameConventions = {
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
  /** Скорость ответа.
   * @readonly
   * @enum {string}
   */
  responseSpeed: {
    /** Нормальная скорость. */
    normal: `normal`,
    /** Быстрый ответ. */
    fast: `fast`,
    /** Медленный ответ. */
    slow: `slow`,
  }
};

/* Экспорт интерфейса модуля.
 *************************************************************************************************/

/**
 * Соглашения принятые в игре.
 * @type {object}
 * @property {object} scoreRates - Количество очков при завершении игры.
 * @property {number} scoreRates.gameFailed - Количество очков в случае проигрыша.
 * @property {object} responseSpeed - Скорость ответа.
 * @property {number} responseSpeed.normal - Нормальная скорость.
 * @property {number} responseSpeed.fast - Быстрый ответ.
 * @property {number} responseSpeed.slow - Медленный ответ.
 */
export default gameConventions;
