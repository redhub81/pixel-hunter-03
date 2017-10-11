/** @module timer */

/**
 * Создает объект таймера.
 * @param {number} tickCount - Время в тиках таймера.
 * @param {function=} tickCallback - Опциональнйы обратный вызов при очередном тике.
 * @param {function=} finalCallback - Опциональнйы обратный вызов при отсутствии тиков.
 * @return {object} - Таймер.
 */
const createTimer = function (tickCount, tickCallback = null, finalCallback = null) {
  if (tickCount < 0) {
    throw new Error(`The argument 'tickCount' must be not less than zero.`);
  }
  let timer = {
    getTickCount: () => tickCount,
    tick: () => {
      const oldTickCount = tickCount;
      tickCount = tickCount !== 0 ? tickCount - 1 : tickCount;
      if (tickCount === oldTickCount) {
        return timer;
      }
      const defaultTickCallback = (t, fcb, tcb) => createTimer(t.getTickCount(), fcb, tcb);
      timer = (tickCallback || defaultTickCallback)(timer, finalCallback, tickCallback)
        || defaultTickCallback(timer, finalCallback, tickCallback);
      if ((!timer.getTickCount()) && finalCallback) {
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
