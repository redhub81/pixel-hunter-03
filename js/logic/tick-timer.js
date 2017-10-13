/** @module tick-timer */

/**
 * Создает объект таймера.
 * @param {number} ticksCount - Время в тиках таймера.
 * @param {function=} tickCallback - Опциональнйы обратный вызов при очередном тике.
 * @param {function=} finalCallback - Опциональнйы обратный вызов при отсутствии тиков.
 * @return {object} - Таймер.
 */
const createTimer = function (ticksCount, tickCallback = null, finalCallback = null) {
  if (ticksCount < 0) {
    throw new Error(`The argument 'ticksCount' must be not less than zero.`);
  }
  let timer = {
    getTicksCount: () => ticksCount,
    tick: () => {
      const oldTicksCount = ticksCount;
      ticksCount = ticksCount !== 0 ? ticksCount - 1 : ticksCount;
      if (ticksCount === oldTicksCount) {
        return timer;
      }
      const defaultTickCallback = (t, fcb, tcb) => createTimer(t.getTicksCount(), fcb, tcb);
      timer = (tickCallback || defaultTickCallback)(timer, finalCallback, tickCallback)
        || defaultTickCallback(timer, finalCallback, tickCallback);
      if ((!timer.getTicksCount()) && finalCallback) {
        finalCallback(timer);
      }
      return timer;
    }
  };
  return timer;
};

/* Экспорт интерфейса модуля.
 *************************************************************************************************/

export {createTimer};
