/** @module game/game-state */

import gameConventions from '../config/game-conventions.js';
import gameSettings from '../config/game-settings.js';
import levelsFactory from './levels-factory.js';
import scoring from '../logic/scoring.js';

const {ResultType, SpeedType, ScoreLimits} = gameConventions;
const {TotalCount, TimeSteps} = gameSettings;


const createGameState = function (playerName) {
  return {
    player: {
      name: playerName
    },
    livesCount: TotalCount.LIVES,
    time: 0.5 * TotalCount.TIME,
    levelNumber: 0,
    level: {},
    answers: [],
    isComplete: false,
  };
};

const createGameAnswer = function (answerCode, isRight, time) {
  const resultType = isRight
    ? ResultType.RIGHT
    : ResultType.WRONG;
  let speed = SpeedType.NORMAL;
  if (time > TimeSteps.FAST) {
    speed = SpeedType.FAST;
  } else if (time < TimeSteps.SLOW) {
    speed = SpeedType.SLOW;
  }
  return {answerCode, resultType, speed};
};

const createGameResult = function (gameState) {
  const totalPoints = scoring.getCompletionScore(gameState.answers, gameState.livesCount);
  const isSuccess = totalPoints !== ScoreLimits.FAILED;
  const result = {
    answers: gameState.answers,
    resultType: isSuccess
      ? ResultType.RIGHT
      : ResultType.WRONG,
    totalPoints,
    levelsStatistic: {},
    speedStatistic: {},
    livesStatistic: {},
  };
  if (isSuccess) {
    result.levelsStatistic = scoring.getLevelsStatistic(gameState.answers);
    result.speedStatistic = scoring.getSpeedStatistic(gameState.answers);
    result.livesStatistic = scoring.getLivesStatistic(gameState.livesCount);
  }
  return result;
};

let _state;
let _levels;
const _results = [];

const gameState = {
  get state() {
    return _state;
  },
  get levels() {
    return _levels;
  },
  get results() {
    return _results;
  },
  newGame: (playerName) => {
    _state = createGameState(playerName);
    _levels = levelsFactory.createLevels();
    _state.level = _levels[_state.levelNumber];
  },
  completeLevel: (answerCode) => {
    if (!_state || _state.isComplete) {
      return;
    }
    const isRight = answerCode === _state.level.answerCode;
    const time = _state.time;
    const answer = createGameAnswer(answerCode, isRight, time);
    _state.answers.push(answer);
    if (!isRight) {
      _state.livesCount--;
    }

    const levelNumber = _state.levelNumber + 1;
    if (_state.livesCount < 0 || levelNumber === _levels.length) {
      gameState.completeGame();
    }
    _state.levelNumber = levelNumber;
    _state.level = _levels[levelNumber];
  },
  completeGame: () => {
    const gameResult = createGameResult(_state);
    _results.unshift(gameResult);
    _state.isComplete = true;
  }
};

export default gameState;
