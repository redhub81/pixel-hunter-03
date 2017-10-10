/** @module timer */

/**
 * Создает объект таймера.
 * @param {number} tickCount - Время в тиках таймера.
 * @param {function=} callback - Опциональнйы обратный вызов при завершении.
 * @return {object} - Таймер.
 */
const createTimer = function (tickCount, callback = null) {
  if (tickCount < 0) {
    throw new Error(`The argument 'tickCount' must be not less than zero.`);
  }
  return {
    getRemainingTickCount: () => tickCount,
    tick: () => {
      const newTickCount = tickCount !== 0 ? tickCount - 1 : tickCount;
      if (!newTickCount && tickCount && callback) {
        callback();
      }
      return createTimer(newTickCount, callback);
    }
  };
};

/* Экспорт интерфейса модуля.
 *************************************************************************************************/

export {createTimer};
