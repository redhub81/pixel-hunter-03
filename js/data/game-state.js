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
  let speed = SpeedType.UNKNOWN;
  if (isRight && time) {
    speed = SpeedType.NORMAL;
    if (time > TimeSteps.FAST) {
      speed = SpeedType.FAST;
    } else if (time < TimeSteps.SLOW) {
      speed = SpeedType.SLOW;
    }
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

let timer = {};
let state = {};
let levels = {};
const results = [];

const gameState = {
  get state() {
    return state;
  },
  get levels() {
    return levels;
  },
  get results() {
    return results;
  },
  newGame: (playerName) => {
    state = createGameState(playerName);
    levels = levelsFactory.createLevels();
    const levelNumber = state.levelNumber;
    state.level = levels[levelNumber];

    timer = new Timer(TotalCount.TIME, () => {
      state.time = timer.getTicksCount();
      gameState.onTimeout();
    });
    timer.onTick = (tick) => {
      state.time = tick;
    };
    timer.start();
  },
  completeLevel: (answerCode) => {
    timer.stop();
    if (!state || state.isComplete) {
      return;
    }
    const isRight = answerCode === state.level.answerCode;
    const time = state.time;
    const answer = createGameAnswer(answerCode, isRight, time);
    state.answers.push(answer);

    if (!isRight) {
      state.livesCount--;
    }
    const levelNumber = state.levelNumber + 1;
    if (state.livesCount < 0 || levelNumber === levels.length) {
      gameState.completeGame();
      return;
    }
    state.onChanged = () => {};
    state.levelNumber = levelNumber;
    state.level = levels[levelNumber];
    state.time = TotalCount.TIME;
    timer.setTicksCount(TotalCount.TIME);
    timer.start();
  },
  completeGame: () => {
    const gameResult = createGameResult(state);
    results.unshift(gameResult);
    state.isComplete = true;
  },
  onTimeout: () => {}
};

/* Экспорт интерфейса модуля.
 *************************************************************************************************/

export default gameState;
