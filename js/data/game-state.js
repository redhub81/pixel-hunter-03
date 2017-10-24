/** @module game/game-state */

import gameConventions from '../config/game-conventions.js';
import gameSettings from '../config/game-settings.js';
import levelsFactory from './levels-factory.js';
import scoring from '../logic/scoring.js';
import Timer from '../logic/timer.js';

const {ResultType, SpeedType, ScoreLimits} = gameConventions;
const {TotalCount, TimeSteps} = gameSettings;


const createGameState = function (playerName) {
  const state = {
    _time: TotalCount.TIME,
    player: {
      name: playerName
    },
    livesCount: TotalCount.LIVES,
    get time() {
      return state._time;
    },
    set time(value) {
      state._time = value;
      state.onChanged({target: `time`});
    },
    levelNumber: 0,
    level: {},
    answers: [],
    isComplete: false,
    onChanged: () => {},
  };
  return state;
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
  _timerId: null,
  _timer: {},
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
    gameState._timer = new Timer(TotalCount.TIME, () => {
      gameState.state.time = gameState._timer.getTicksCount();
      gameState.onTimeout();
    });
    gameState._startTimer();
  },
  _startTimer: () => {
    gameState._timerId = setTimeout(gameState._restartTimer, 1000);
  },
  _restartTimer: () => {
    const timer = gameState._timer;
    gameState._timerId = null;
    timer.tick();
    if (timer === gameState._timer) {
      gameState.state.time = gameState._timer.getTicksCount();
      gameState._startTimer();
    }
  },
  completeLevel: (answerCode) => {
    if (gameState._timerId) {
      clearTimeout(gameState._timerId);
      gameState._timerId = null;
    }
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
    _state.onChanged = () => {};
    _state.levelNumber = levelNumber;
    _state.level = _levels[levelNumber];
    _state.time = TotalCount.TIME;

    gameState._timer = new Timer(TotalCount.TIME, gameState.onTimeout);
    gameState._startTimer();
  },
  completeGame: () => {
    const gameResult = createGameResult(_state);
    _results.unshift(gameResult);
    _state.isComplete = true;
  },
  onTimeout: () => {}
};

export default gameState;
