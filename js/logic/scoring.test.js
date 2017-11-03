/** @module logic/scoring.test */

import assert from 'assert';
import gameConventions from "../config/game-conventions";
import gameSettings from "../config/game-settings";
import scoring from './scoring';

const {ResultType, SpeedType, ScoreLimits} = gameConventions;
const {TotalCount} = gameSettings;


/**
 * Предоставляет средства проверки результата
 * @namespace
 */
const expect = {
  game: {
    failed: (score) => score === ScoreLimits.FAILED,
    success: (score) => score > ScoreLimits.MINIMUM,
  }
};

const getUserResponses = (count = TotalCount.QUESTIONS, resultType = ResultType.RIGHT, speed = SpeedType.NORMAL) =>
  new Array(count)
      .fill(null)
      .map(() => ({answerCode: 0, resultType, speed}));

describe(`Game scoring:`, () => {
  it(`is failed when less than 10 responses.`, () => {
    // Arrange
    const LIVES_COUNT = TotalCount.LIVES;
    const userResponsesCases = [];
    for (let i = 1; i < 10; i++) {
      userResponsesCases[i] = getUserResponses(i);
    }

    // Act
    const resultScores = [];
    for (let i = 1; i < userResponsesCases.length; i++) {
      resultScores[i] = scoring.getCompletionScore(userResponsesCases[i], LIVES_COUNT);
    }

    // Assert
    resultScores.forEach((score, index) => assert.ok(expect.game.failed(score), `expected game failed: caseIndex = ${index}.`));
  });

  it(`is success when all responses, each response right, all lives saved, speed of each normal.`, () => {
    // Arrange
    const LIVES_COUNT = TotalCount.LIVES;
    const EXPECTED_SCORE = 1150;
    const userResponses = getUserResponses();

    // Act
    const resultScore = scoring.getCompletionScore(userResponses, LIVES_COUNT);

    // Assert
    assert.ok(resultScore === EXPECTED_SCORE, `expected game score = ${EXPECTED_SCORE}, but received ${resultScore}`);
  });

  it(`is success when all responses, each response right, 2 lives saved, speed of each normal.`, () => {
    // Arrange
    const LIVES_COUNT = 2;
    const EXPECTED_SCORE = 1100;
    const userResponsesItems = getUserResponses();

    // Act
    const resultScore = scoring.getCompletionScore(userResponsesItems, LIVES_COUNT);

    // Assert
    assert.ok(resultScore === EXPECTED_SCORE, `expected game score = ${EXPECTED_SCORE}, but received ${resultScore}`);
  });

  it(`is success when all responses, each response right, 1 lives saved, speed of each normal.`, () => {
    // Arrange
    const LIVES_COUNT = 1;
    const EXPECTED_SCORE = 1050;
    const userResponsesItems = getUserResponses();

    // Act
    const resultScore = scoring.getCompletionScore(userResponsesItems, LIVES_COUNT);

    // Assert
    assert.ok(resultScore === EXPECTED_SCORE, `expected game score = ${EXPECTED_SCORE}, but received ${resultScore}`);
  });

  it(`is failed when all responses, each response right, less than 0 live saved, speed of each normal.`, () => {
    // Arrange
    const LIVES_COUNT = -1;
    const userResponsesItems = getUserResponses();

    // Act
    const resultScore = scoring.getCompletionScore(userResponsesItems, LIVES_COUNT);

    // Assert
    assert.ok(expect.game.failed(resultScore), `expected game failed: score = ${resultScore}.`);
  });

  it(`is failed when all responses, first 6 response right, 0 live saved, speed of each normal.`, () => {
    // Arrange
    const LIVES_COUNT = 0;
    const userResponsesItems = getUserResponses().map((it, index) => {
      it.resultType = index < 6 ? ResultType.RIGHT : ResultType.WRONG;
      return it;
    });

    // Act
    const resultScore = scoring.getCompletionScore(userResponsesItems, LIVES_COUNT);

    // Assert
    assert.ok(expect.game.failed(resultScore), `expected game failed: score = ${resultScore}.`);
  });

  it(`is success when all responses, first 7 response right, 0 live saved, speed of each normal.`, () => {
    // Arrange
    const LIVES_COUNT = 0;
    const EXPECTED_SCORE = 700;
    const userResponsesItems = getUserResponses().map((it, index) => {
      it.resultType = index < 7 ? ResultType.RIGHT : ResultType.WRONG;
      return it;
    });

    // Act
    const resultScore = scoring.getCompletionScore(userResponsesItems, LIVES_COUNT);

    // Assert
    assert.ok(resultScore === EXPECTED_SCORE, `expected game score = ${EXPECTED_SCORE}, but received ${resultScore}`);
  });

  it(`is success when all responses, each response right, all lives saved, speed of each fast.`, () => {
    // Arrange
    const LIVES_COUNT = TotalCount.LIVES;
    const EXPECTED_SCORE = 1650;
    const userResponsesItems = getUserResponses(void 0, void 0, SpeedType.FAST);

    // Act
    const resultScore = scoring.getCompletionScore(userResponsesItems, LIVES_COUNT);

    // Assert
    assert.ok(resultScore === EXPECTED_SCORE, `expected game score = ${EXPECTED_SCORE}, but received ${resultScore}`);
  });

  it(`is success when all responses, each response right, all lives saved, speed of each slow.`, () => {
    // Arrange
    const LIVES_COUNT = TotalCount.LIVES;
    const EXPECTED_SCORE = 650;
    const userResponsesItems = getUserResponses(void 0, void 0, SpeedType.SLOW);

    // Act
    const resultScore = scoring.getCompletionScore(userResponsesItems, LIVES_COUNT);

    // Assert
    assert.ok(resultScore === EXPECTED_SCORE, `expected game score = ${EXPECTED_SCORE}, but received ${resultScore}`);
  });

  it(`is success when all responses, first 2 response wrong other right, all lives saved, speed of each normal.`, () => {
    // Arrange
    const livesCount = TotalCount.LIVES;
    const EXPECTED_SCORE = 950;
    const userResponsesItems = getUserResponses().map((it, index) => {
      it.resultType = index > 1 ? ResultType.RIGHT : ResultType.WRONG;
      return it;
    });

    // Act
    const resultScore = scoring.getCompletionScore(userResponsesItems, livesCount);

    // Assert
    assert.ok(resultScore === EXPECTED_SCORE, `expected game score = ${EXPECTED_SCORE}, but received ${resultScore}`);
  });

  it(`is success when all responses, first 2 response wrong other right, all lives saved, speed of each fast.`, () => {
    // Arrange
    const livesCount = TotalCount.LIVES;
    const EXPECTED_SCORE = 1350;
    const userResponsesItems = getUserResponses().map((it, index) => {
      it.resultType = index > 1 ? ResultType.RIGHT : ResultType.WRONG;
      it.speed = SpeedType.FAST;
      return it;
    });

    // Act
    const resultScore = scoring.getCompletionScore(userResponsesItems, livesCount);

    // Assert
    assert.ok(resultScore === EXPECTED_SCORE, `expected game score = ${EXPECTED_SCORE}, but received ${resultScore}`);
  });

  it(`is success when all responses, first 2 response wrong other right, all lives saved, speed of each slow.`, () => {
    // Arrange
    const livesCount = TotalCount.LIVES;
    const EXPECTED_SCORE = 550;
    const userResponsesItems = getUserResponses().map((it, index) => {
      it.resultType = index > 1 ? ResultType.RIGHT : ResultType.WRONG;
      it.speed = SpeedType.SLOW;
      return it;
    });

    // Act
    const resultScore = scoring.getCompletionScore(userResponsesItems, livesCount);

    // Assert
    assert.ok(resultScore === EXPECTED_SCORE, `expected game score = ${EXPECTED_SCORE}, but received ${resultScore}`);
  });

  it(`is success when all responses, first 2 response wrong with unknown speed other right with slow speed, 2 lives saved.`, () => {
    // Arrange
    const livesCount = 2;
    const EXPECTED_SCORE = 500;
    const userResponsesItems = getUserResponses().map((it, index) => {
      it.resultType = index > 1 ? ResultType.RIGHT : ResultType.WRONG;
      it.speed = index > 1 ? SpeedType.SLOW : SpeedType.UNKNOWN;
      return it;
    });

    // Act
    const resultScore = scoring.getCompletionScore(userResponsesItems, livesCount);

    // Assert
    assert.ok(resultScore === EXPECTED_SCORE, `expected game score = ${EXPECTED_SCORE}, but received ${resultScore}`);
  });
});
