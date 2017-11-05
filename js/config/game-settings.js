/** @module config/game-settings */

/** Схема униклаьного идентификатора ресурса.
 * @enum {string}
 */
const UriScheme = {
  HTTP: `http`,
  HTTPS: `https`,
};

/** Домены игровых серверов. */
const GameDomain = {
  HTML_ACADEMY: `es.dump.academy`,
};

/** Относительные пути к ресурсам игры на сервере.
 * @enum {string}
 */
const GameRelativeUrlPath = {
  BASE: `pixel-hunter`,
  QUESTIONS: `questions`,
  STATS: `stats`,
};

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
  /** Критически малое количество времени у игрока. */
  WARNING: 5,
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
  /** Баллы за ответы с неизвестной скоростью. */
  UNKNOWN: 0,
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


export default {
  UriScheme,
  GameDomain,
  GameRelativeUrlPath,
  TotalCount,
  TimeSteps,
  AnswerScore,
  SpeedScore,
  AccuracyScore
};
