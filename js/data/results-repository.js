/** @module data/images-repository */

const results = [];

export default {
  getResults() {
    return results;
  },
  saveResult(result) {
    results.unshift(result);
  }
};
