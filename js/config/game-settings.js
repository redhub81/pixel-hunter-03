/** @module config/game-settings */

/** Суммарное количство ресурсов в игре.
 * @enum {number}
 */
const TotalCount = {
  /** Количество вопросов в игре. */
  QUESTIONS: 10,
  /** Исходное количество жизней у игрока. */
  LIVES: 3,
  /** Исходное количество времени у игрока. */
  TIME: 30,
};

/** Лимиты времени.
 * @enum {number}
 */
const TimeSteps = {
  /** Минимальное время быстрого ответа. */
  FAST: 20,
  /** Максимальное время медленного ответа. */
  SLOW: 10,
};

/** Базовая оценка каждого ответа.
 * @enum {number}
 */
const AnswerScore = {
  /** Баллы за верный ответ. */
  RIGHT: 100,
  /** Баллы за неверный ответ. */
  WRONG: 0,
};

/** Оценка скорости каждого ответа.
 * @enum {number}
 * */
const SpeedScore = {
  /** Баллы за ответ с нормальной скоростью. */
  NORMAL: 0,
  /** Баллы за быстрый ответ. */
  FAST: 50,
  /** Баллы за медленный ответ. */
  SLOW: -50,
};

/** Интегральная оценка точности ответов. */
const AccuracyScore = {
  /** Баллы за каждую не использованную игроком жизнь. */
  LIVES: 50,
};

/* Экспорт интерфейса модуля.
 *************************************************************************************************/

export default {
  TotalCount,
  TimeSteps,
  AnswerScore,
  SpeedScore,
  AccuracyScore
};
