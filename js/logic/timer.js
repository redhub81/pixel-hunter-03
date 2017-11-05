/** @module logic/timer */

const TICK_DELAY = 1000;


export default class Timer {
  /**
   * Создает объект таймера.
   * @param {number} ticksCount - Время в тиках таймера.
   * @param {function} finalCallback - Опциональнйы обратный вызов при отсутствии тиков.
   * @param {function} tickCallback - Опциональный обратный вызов при каждом тике.
   */
  constructor(ticksCount, finalCallback, tickCallback) {
    this._timerId = null;
    this._isRunning = false;
    this._needContinue = false;
    this._finalCallback = finalCallback;
    this._tickCallback = tickCallback;
    this.ticksCount = ticksCount;
  }
  _wait() {
    this._timerId = setTimeout(() => {
      this._timerId = null;
      this._doWork();
    }, TICK_DELAY);
  }
  _doWork() {
    if (!this._isRunning) {
      return;
    }
    this._needContinue = true;
    this.tick();
    if (this._isRunning && this._needContinue) {
      this._wait();
    }
  }
  _raiseTickCallback() {
    if (this._tickCallback) {
      this._tickCallback(this._ticksCount);
    }
  }
  _raiseFinalCallback() {
    if (this._finalCallback) {
      this._finalCallback();
    }
  }
  get ticksCount() {
    return this._ticksCount;
  }
  set ticksCount(value) {
    const ticksCount = Math.floor(value);
    if (ticksCount < 0) {
      throw new Error(`The argument 'ticksCount' must be not less than zero.`);
    }
    if (this._isRunning) {
      throw new Error(`The timer is running. You have to stop it before set the ticksCount.`);
    }
    this._ticksCount = ticksCount;
  }
  tick() {
    if (this._ticksCount === 0) {
      return;
    }
    this._ticksCount--;
    this._raiseTickCallback();
    if (this._ticksCount === 0) {
      this.stop();
      this._raiseFinalCallback();
    }
  }
  start() {
    if (this._isRunning || this._ticksCount === 0) {
      return;
    }
    this._isRunning = true;
    this._wait();
  }
  stop() {
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
  }
}
