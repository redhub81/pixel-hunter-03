/** @module game-settings */

/**
 * Настройки игры.
 * @type {object}
 */
const GAME_SETTINGS = {
  /** Количество вопросов в игре. */
  totalQuestionsCount: 10,
  /** Исходное количество жизней у игрока. */
  totalLivesCount: 3,
  /** Оценки результатов игры в очках. */
  scoreRates: {
    /** Очки за данные ответы. */
    response: {
      /** Очки за верный ответ. */
      right: 100,
      /** Очки за неверный ответ. */
      wrong: 0,
    },
    /** Бонусные очки за скорость. */
    speedBonus: {
      /** Бонус за ответ с нормальной скоростью. */
      normal: 0,
      /** Бонус за быстрый ответ. */
      fast: 50,
      /** Бонус за медленный ответ. */
      slow: -50,
    },
    /** Бонусные очки за жизни. */
    liveBonus: {
      /** Бонус за одну сохраненную жизнь. */
      savedLive: 50,
    },
  },
};

/* Экспорт интерфейса модуля.
 *************************************************************************************************/

/**
 * Предоставляет настройки игры.
 * @type {object}
 * @property {number} totalQuestionsCount - Количество вопросов в игре.
 * @property {number} totalLivesCount - Исходное количество жизней у игрока.
 * @property {object} scoreRates - Оценки результатов.
 * @property {object} scoreRates.response - Очки за данные ответы.
 * @property {number} scoreRates.response.right - Очки за верный ответ.
 * @property {number} scoreRates.response.right - Очки за неверный ответ.
 * @property {object} scoreRates.speedBonus - Оценки ответов.
 * @property {number} scoreRates.speedBonus.normal - Бонус за ответ с нормальной скоростью.
 * @property {number} scoreRates.speedBonus.fast - Бонус за быстрый ответ.
 * @property {number} scoreRates.speedBonus.slow - Бонус за медленный ответ.
 * @property {object} scoreRates.liveBonus - Бонусные очки за жизни.
 * @property {number} scoreRates.liveBonus.savedLive - Бонус за одну сохраненную жизнь.
 */
export default GAME_SETTINGS;
