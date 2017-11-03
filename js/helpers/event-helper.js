/** @module helpers/event-helper */

export const raiseEvent = (handler, data = void 0) => {
  if (handler) {
    handler(data);
  }
};
