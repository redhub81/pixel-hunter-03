/** @module game/models/game-state-model */

import gameConventions from '../../config/game-conventions';
import gameSettings from '../../config/game-settings';

const {ResultType, ResultCode, SpeedType} = gameConventions;
const {TimeSteps} = gameSettings;


export default class GameAnswerModel {
  constructor(resultType, speed) {
    this._resultType = resultType;
    this._speed = speed;
  }
  static create({isRight, time}) {
    const resultType = GameAnswerModel._getResultType(isRight);
    const speed = GameAnswerModel._getSpeed(isRight, time);
    return new this(resultType, speed);
  }
  static _getResultType(isRight) {
    return isRight
      ? ResultType.RIGHT
      : ResultType.WRONG;
  }
  static _getSpeed(isRight, time) {
    let speed = SpeedType.UNKNOWN;
    if (isRight && time) {
      speed = SpeedType.NORMAL;
      if (time > TimeSteps.FAST) {
        speed = SpeedType.FAST;
      } else if (time < TimeSteps.SLOW) {
        speed = SpeedType.SLOW;
      }
    }
    return speed;
  }
  get resultType() {
    return this._resultType;
  }
  get resultCode() {
    if (!this.resultType) {
      return null;
    }
    if (this.resultType === ResultType.WRONG) {
      return ResultCode.WRONG;
    }
    switch (this.speed) {
      case SpeedType.FAST: return ResultCode.FAST;
      case SpeedType.SLOW: return ResultCode.SLOW;
      default: return ResultCode.CORRECT;
    }
  }
  get speed() {
    return this._speed;
  }
}
