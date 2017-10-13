/** @module scoring.test */

import assert from 'assert';
import gameConventions from "../config/game-conventions.js";
import gameSettings from "../config/game-settings.js";
import scoring from './scoring.js';

/**
 * Предоставляет средства проверки результата
 * @namespace
 */
const expect = {
  game: {
    failed: (score) => score === gameConventions.scoreLimits.gameFailed,
    success: (score) => score > gameConventions.scoreLimits.minimum,
  }
};

const getUserResponses = (
    count = gameSettings.totalQuestionsCount, isRight = true, speed = gameConventions.responseSpeed.normal
) => new Array(count)
    .fill(null)
    .map(() => ({isRight, speed}));

describe(`Game scoring:`, () => {
  it(`is failed when less than 10 responses.`, () => {
    // Arrange
    const userResponsesCases = [];
    for (let i = 1; i < 10; i++) {
      userResponsesCases[i] = getUserResponses(i);
    }
    const livesCount = gameSettings.totalLivesCount;

    // Act
    const resultScores = [];
    for (let i = 1; i < userResponsesCases.length; i++) {
      resultScores[i] = scoring.getCompletionScore(userResponsesCases[i], livesCount);
    }

    // Assert
    resultScores.forEach((score, index) => assert.ok(expect.game.failed(score), `expected game failed: caseIndex = ${index}.`));
  });

  it(`is success when all responses, each response right, all lives saved, speed of each normal.`, () => {
    // Arrange
    const userResponses = getUserResponses();
    const livesCount = gameSettings.totalLivesCount;
    const expectedScore = 1150;

    // Act
    const resultScore = scoring.getCompletionScore(userResponses, livesCount);

    // Assert
    assert.ok(resultScore === expectedScore, `expected game score = ${expectedScore}, but received ${resultScore}`);
  });

  it(`is success when all responses, each response right, 2 lives saved, speed of each normal.`, () => {
    // Arrange
    const userResponsesItems = getUserResponses();
    const livesCount = 2;
    const expectedScore = 1100;

    // Act
    const resultScore = scoring.getCompletionScore(userResponsesItems, livesCount);

    // Assert
    assert.ok(resultScore === expectedScore, `expected game score = ${expectedScore}, but received ${resultScore}`);
  });

  it(`is success when all responses, each response right, 1 lives saved, speed of each normal.`, () => {
    // Arrange
    const userResponsesItems = getUserResponses();
    const livesCount = 1;
    const expectedScore = 1050;

    // Act
    const resultScore = scoring.getCompletionScore(userResponsesItems, livesCount);

    // Assert
    assert.ok(resultScore === expectedScore, `expected game score = ${expectedScore}, but received ${resultScore}`);
  });

  it(`is failed when all responses, each response right, less than 1 live saved, speed of each normal.`, () => {
    // Arrange
    const userResponsesItems = getUserResponses();
    const livesCount = 0;

    // Act
    const resultScore = scoring.getCompletionScore(userResponsesItems, livesCount);

    // Assert
    assert.ok(expect.game.failed(resultScore), `expected game failed: score = ${resultScore}.`);
  });

  it(`is success when all responses, each response right, all lives saved, speed of each fast.`, () => {
    // Arrange
    const userResponsesItems = getUserResponses(void 0, void 0, gameConventions.responseSpeed.fast);
    const livesCount = gameSettings.totalLivesCount;
    const expectedScore = 1650;

    // Act
    const resultScore = scoring.getCompletionScore(userResponsesItems, livesCount);

    // Assert
    assert.ok(resultScore === expectedScore, `expected game score = ${expectedScore}, but received ${resultScore}`);
  });

  it(`is success when all responses, each response right, all lives saved, speed of each slow.`, () => {
    // Arrange
    const userResponsesItems = getUserResponses(void 0, void 0, gameConventions.responseSpeed.slow);
    const livesCount = gameSettings.totalLivesCount;
    const expectedScore = 650;

    // Act
    const resultScore = scoring.getCompletionScore(userResponsesItems, livesCount);

    // Assert
    assert.ok(resultScore === expectedScore, `expected game score = ${expectedScore}, but received ${resultScore}`);
  });

  it(`is success when all responses, first 2 response wrong other right, all lives saved, speed of each normal.`, () => {
    // Arrange
    const userResponsesItems = getUserResponses().map((it, index) => {
      it.isRight = index > 1;
      return it;
    });
    const livesCount = gameSettings.totalLivesCount;
    const expectedScore = 950;

    // Act
    const resultScore = scoring.getCompletionScore(userResponsesItems, livesCount);

    // Assert
    assert.ok(resultScore === expectedScore, `expected game score = ${expectedScore}, but received ${resultScore}`);
  });
});
