/** @module screens/stats/stats-model */

class StatsModel {
  constructor(results = []) {
    this._results = results.slice(0);
  }
  add(result) {
    this._results.unshift(result);
  }
  get results() {
    return this._results;
  }
}

export default StatsModel;
