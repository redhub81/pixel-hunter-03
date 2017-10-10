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

describe(`Score on game completion tests:`, () => {
  it(`failed then less than 10 responses.`, () => {
    // Arrange
    const userResponsesCases = [];
    for (let i = 1; i < 10; i++) {
      userResponsesCases[i] = new Array(i);
    }
    const keptLives = gameSettings.totalLivesCount;

    // Act
    const resultScores = [];
    for (let i = 1; i < userResponsesCases.length; i++) {
      resultScores[i] = scoring.getCompletionScore(userResponsesCases[i], keptLives);
    }

    // Assert
    resultScores.forEach((score, index) => assert.ok(expect.game.failed(score), `expected game failed: caseIndex = ${index}.`));
  });

  it(`success then all responses given and each response right and all lives kept and speed of each response was normal.`, () => {
    // Arrange
    const userResponses = new Array(gameSettings.totalQuestionsCount).fill(null)
        .map(() => ({isRight: true, speed: gameConventions.responseSpeed.normal}));
    const keptLives = gameSettings.totalLivesCount;
    const expectedScore = 1150;

    // Act
    const resultScore = scoring.getCompletionScore(userResponses, keptLives);

    // Assert
    assert.ok(expect.game.success(resultScore), `expected game success: score = ${resultScore}.`);
    assert.ok(resultScore === expectedScore, `expected game score = ${expectedScore}, but received ${resultScore}`);
  });

  it(`success then all responses given and each response right and 2 lives kept and speed of the each response was normal.`, () => {
    // Arrange
    const userResponsesItems = new Array(gameSettings.totalQuestionsCount).fill(null)
        .map(() => ({isRight: true, speed: gameConventions.responseSpeed.normal}));
    const keptLives = 2;
    const expectedScore = 1100;

    // Act
    const resultScore = scoring.getCompletionScore(userResponsesItems, keptLives);

    // Assert
    assert.ok(expect.game.success(resultScore), `expected game success: score = ${resultScore}.`);
    assert.ok(resultScore === expectedScore, `expected game score = ${expectedScore}, but received ${resultScore}`);
  });

  it(`success then all responses given and each response right and 1 lives kept and speed of the each response was normal.`, () => {
    // Arrange
    const userResponsesItems = new Array(gameSettings.totalQuestionsCount).fill(null)
        .map(() => ({isRight: true, speed: gameConventions.responseSpeed.normal}));
    const keptLives = 1;
    const expectedScore = 1050;

    // Act
    const resultScore = scoring.getCompletionScore(userResponsesItems, keptLives);

    // Assert
    assert.ok(expect.game.success(resultScore), `expected game success: score = ${resultScore}.`);
    assert.ok(resultScore === expectedScore, `expected game score = ${expectedScore}, but received ${resultScore}`);
  });

  it(`failed then all responses given and each response right and less than 1 lives kept and speed of the each response was normal.`, () => {
    // Arrange
    const userResponsesItems = new Array(gameSettings.totalQuestionsCount).fill(null)
        .map(() => ({isRight: true, speed: gameConventions.responseSpeed.normal}));
    const keptLives = 0;

    // Act
    const resultScore = scoring.getCompletionScore(userResponsesItems, keptLives);

    // Assert
    assert.ok(expect.game.failed(resultScore), `expected game failed: score = ${resultScore}.`);
  });

  it(`success then all responses given and each response right and all lives kept and speed of the each response was fast.`, () => {
    // Arrange
    const userResponsesItems = new Array(gameSettings.totalQuestionsCount).fill(null)
        .map(() => ({isRight: true, speed: gameConventions.responseSpeed.fast}));
    const keptLives = gameSettings.totalLivesCount;
    const expectedScore = 1650;

    // Act
    const resultScore = scoring.getCompletionScore(userResponsesItems, keptLives);

    // Assert
    assert.ok(expect.game.success(resultScore), `expected game success: score = ${resultScore}.`);
    assert.ok(resultScore === expectedScore, `expected game score = ${expectedScore}, but received ${resultScore}`);
  });

  it(`success then all responses given and each response right and all lives kept and speed of the each response was slow.`, () => {
    // Arrange
    const userResponsesItems = new Array(gameSettings.totalQuestionsCount).fill(null)
        .map(() => ({isRight: true, speed: gameConventions.responseSpeed.slow}));
    const keptLives = gameSettings.totalLivesCount;
    const expectedScore = 650;

    // Act
    const resultScore = scoring.getCompletionScore(userResponsesItems, keptLives);

    // Assert
    assert.ok(expect.game.success(resultScore), `expected game success: score = ${resultScore}.`);
    assert.ok(resultScore === expectedScore, `expected game score = ${expectedScore}, but received ${resultScore}`);
  });
});
