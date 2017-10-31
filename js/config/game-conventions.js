/** @module config/game-conventions */

/** Типы уровней.
 * @enum {number}
 */
const LevelType = {
  /** Требуется указать тип одного изображения. */
  TYPE_OF_ONE_IMAGE: 1,
  /** Требуется указать тип каждого из двух изображений. */
  TYPE_OF_TWO_IMAGES: 2,
  /** Требуется указать одно фото среди 3 изображений. */
  PHOTO_AMONG_THREE_IMAGES: 3,
  /** Требуется указать один рисунок среди 3 изображений. */
  PAINTING_AMONG_THREE_IMAGES: 4,
};

/** Типы изображений.
 * @enum {string}
 */
const ImageType = {
  /** Фото */
  PHOTO: `PHOTO`,
  PAINTING: `PAINTING`,
};

/** Коды изображений.
 * @enum {number}
 */
const ImageCode = {
  PHOTO: 0,
  PAINTING: 1,
};

/** Количество очков при завершении игры.
 * @enum {number}
 */
const ScoreLimits = {
  /** Количество очков в случае проигрыша. */
  FAILED: -1,
  /** Минимальное количество очков. */
  MINIMUM: 0,
};

/** Типы результатов игры.
 * @enum {string}
 */
const ResultType = {
  /** Правильный результат. */
  RIGHT: `RIGHT`,
  /** Неверный результат. */
  WRONG: `WRONG`,
};

const ResultCode = {
  WRONG: `wrong`,
  CORRECT: `correct`,
  FAST: `fast`,
  SLOW: `slow`,
};

/** Скорость ответа.
 * @enum {string}
 */
const SpeedType = {
  /** Cкорость неизвестна. */
  UNKNOWN: `UNKNOWN`,
  /** Нормальная скорость. */
  NORMAL: `NORMAL`,
  /** Быстрый ответ. */
  FAST: `FAST`,
  /** Медленный ответ. */
  SLOW: `SLOW`,
};

const ScreenId = {
  INTRO: ``,
  GREETING: `greeting`,
  RULES: `rules`,
  GAME: `game`,
  STATS: `stats`,
};

export default {
  ScoreLimits,
  ResultType,
  SpeedType,
  ImageType,
  LevelType,
  ImageCode,
  ScreenId,
};
