/** @module logic/timer */

/**
 * Создает объект таймера.
 * @param {number} ticksCount - Время в тиках таймера.
 * @param {function} finalCallback - Опциональнйы обратный вызов при отсутствии тиков.
 */
const Timer = function (ticksCount, finalCallback) {
  if (ticksCount < 0) {
    throw new Error(`The argument 'ticksCount' must be not less than zero.`);
  }
  this._ticksCount = ticksCount;
  this._finalCallback = finalCallback;
};

Timer.prototype.getTicksCount = function () {
  return this._ticksCount;
};

Timer.prototype.setTicksCount = function (ticksCount) {
  if (ticksCount < 0) {
    throw new Error(`The argument 'ticksCount' must be not less than zero.`);
  }
  this._ticksCount = ticksCount;
};

Timer.prototype.tick = function () {
  if (this._ticksCount === 0) {
    return;
  }
  this._ticksCount--;
  if (this._ticksCount === 0) {
    this._finalCallback();
  }
};

/* Экспорт интерфейса модуля.
 *************************************************************************************************/

export default Timer;
