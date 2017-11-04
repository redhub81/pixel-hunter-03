/** @module config/game-conventions */

/** Типы уровней.
 * @enum {number}
 */
const LevelType = {
  /** Требуется указать тип одного изображения. */
  TYPE_OF_ONE_IMAGE: `tinder-like`,
  /** Требуется указать тип каждого из двух изображений. */
  TYPE_OF_TWO_IMAGES: `two-of-two`,
  /** Требуется указать одно фото среди 3 изображений. */
  PHOTO_AMONG_THREE_IMAGES: `photo-of-three`,
  /** Требуется указать один рисунок среди 3 изображений. */
  PAINTING_AMONG_THREE_IMAGES: `painting-of-three`,
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

/** Коды результатов игры.
 * @enum {number}
 */
const ResultCode = {
  WRONG: 0,
  CORRECT: 1,
  FAST: 2,
  SLOW: 3,
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

/** Коды скорости ответа.
 * @enum {number}
 */
const SpeedCode = {
  /** Нормальная скорость. */
  NORMAL: 1,
  /** Быстрый ответ. */
  FAST: 2,
  /** Медленный ответ. */
  SLOW: 3,
};

/** Идентификаторы игровых экранов.
 * @enum {string}
 */
const ScreenId = {
  INTRO: ``,
  GREETING: `greeting`,
  RULES: `rules`,
  GAME: `game`,
  STATS: `stats`,
};

/** Направление сортировки данных.
 * @enum {number}
 */
const OrderDirection = {
  /** В порядке возрастания. */
  ASC: 1,
  /** В порядке убывания. */
  DESC: -1,
};

/** Идентификаторы сообщений
 * @enum {string}
 */
const MessageId = {
  WARNING_CONTINUE_APP_WORKING: `warningContinueAppWorking`,
  WARNING_CONTINUE_APP_OFFLINE: `warningContinueAppOffline`,
  ERROR_UNRECOVERABLE: `errorUnrecoverable`,
  ERROR_GAME_SAVE: `errorSaveGame`,
  ERROR_GAME_LEVELS_LOADING: `errorGameLevelsLoading`,
  ERROR_GAME_CANNOT_LOAD_DATA: `errorGameCannotLoadData`,
  ERROR_GAME_LEVEL_IMAGE_NOT_LOADED: `errorGameLevelImageNotLoaded`,
  ERROR_GAME_LEVEL_IMAGES_NOT_LOADED: `errorGameLevelImagesNotLoaded`,
  ERROR_GAME_STATS_NOT_LOADED: `errorGameStatsNotLoaded`,
};


export default {
  ScoreLimits,
  ResultType,
  ResultCode,
  SpeedType,
  SpeedCode,
  ImageType,
  LevelType,
  ImageCode,
  ScreenId,
  OrderDirection,
  MessageId
};
