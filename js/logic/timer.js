/** @module logic/timer */

/**
 * Создает объект таймера.
 * @param {number} ticksCount - Время в тиках таймера.
 * @param {function} finalCallback - Опциональнйы обратный вызов при отсутствии тиков.
 */
const Timer = function (ticksCount, finalCallback) {
  this._timerId = null;
  this.onTick = () => {};
  this._isRunning = false;
  this._needContinue = false;
  this._finalCallback = finalCallback;
  this.setTicksCount(ticksCount);
};

Timer.prototype.TICK_DELAY = 1000;

Timer.prototype._wait = function () {
  this._timerId = setTimeout(() => {
    this._timerId = null;
    this._onWaitComplete();
  }, this.TICK_DELAY);
};

Timer.prototype._onWaitComplete = function () {
  if (!this._isRunning) {
    return;
  }
  this._needContinue = true;
  this.tick();
  if (this._isRunning && this._needContinue) {
    this._wait();
  }
};

Timer.prototype.getTicksCount = function () {
  return this._ticksCount;
};

Timer.prototype.setTicksCount = function (ticksCount) {
  ticksCount = Math.floor(ticksCount);
  if (ticksCount < 0) {
    throw new Error(`The argument 'ticksCount' must be not less than zero.`);
  }
  if (this._isRunning) {
    throw new Error(`The timer is running. You have to stop it before set the ticksCount.`);
  }
  this._ticksCount = ticksCount;
};

Timer.prototype.tick = function () {
  if (this._ticksCount === 0) {
    return;
  }
  this._ticksCount--;
  if (this.onTick) {
    this.onTick(this._ticksCount);
  }
  if (this._ticksCount === 0) {
    this.stop();
    this._finalCallback();
  }
};

Timer.prototype.start = function () {
  if (this._isRunning || this._ticksCount === 0) {
    return;
  }
  this._isRunning = true;
  this._wait();
};

Timer.prototype.stop = function () {
  if (!this._isRunning) {
    return;
  }
  this._needContinue = false;
  this._isRunning = false;
  const timerId = this._timerId;
  if (timerId) {
    clearTimeout(timerId);
    this._timerId = null;
  }
};

/* Экспорт интерфейса модуля.
 *************************************************************************************************/

export default Timer;
