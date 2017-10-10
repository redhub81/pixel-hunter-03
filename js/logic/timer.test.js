/** @module timer.test */

import assert from 'assert';
import {createTimer} from './timer.js';

describe(`Timer behavior tests.`, () => {
  it(`Timer factory creates an object with tick method for valid tick count.`, () => {
    // Arrange
    const tickCount = 1;

    // Act
    const timer = createTimer(tickCount);

    // Assert
    assert.ok(timer && typeof timer === `object`, `expected object creation.`);
    assert.ok(timer.tick && typeof timer.tick === `function`,
        `it is expected an object with tick() method has returned from createTimer() function.`);
  });

  it(`Timer factory throws exception on invalid tick count.`, () => {
    // Arrange
    const invalidTickCount = -1;

    // Act with assert
    assert.throws(() => createTimer(invalidTickCount));
  });

  it(`Remaining tick count decreases by one on each tick() method invocation.`, () => {
    // Arrange
    const initialTickCount = 10;
    let timer = createTimer(initialTickCount);

    // Act
    timer = timer.tick();

    // Assert
    const remainingTickCount = timer.getRemainingTickCount();
    assert.ok(typeof remainingTickCount === `number`, `expected remaining tickCount is a number.`);
    assert.ok(initialTickCount - remainingTickCount === 1,
        `it is expected remainingTickCount is less than initial tick count.`);
  });

  it(`Remaining tick count not less then zero.`, () => {
    // Arrange
    const iterations = 2;
    const initialTickCount = 1;
    const expectedTickCountValues = new Array(iterations).fill(0);
    let timer = createTimer(initialTickCount);

    // Act
    const timers = new Array(iterations).fill(null).map(function () {
      timer = timer.tick();
      return timer;
    });

    // Assert
    const remainingTickCountValues = timers.map((t) => t.getRemainingTickCount());
    assert.deepStrictEqual(remainingTickCountValues, expectedTickCountValues,
        `it is expected remainingTickCount equals to zero on each tick() invocation.`);
  });

  it(`Exception is not thrown on tick count has expired and callback absent.`, () => {
    // Arrange
    const initialTickCount = 1;
    let timer = createTimer(initialTickCount);

    // Act
    assert.doesNotThrow(() => timer.tick());
  });

  it(`Timer notifies listener than tick count has expired.`, () => {
    // Arrange
    const initialTickCount = 1;
    let isCallbackInvoked = false;
    let timer = createTimer(initialTickCount, function () {
      isCallbackInvoked = true;
    });

    // Act
    timer.tick();

    // Assert
    assert.ok(isCallbackInvoked, `it is expected callback has invoked.`);
  });

  it(`Timer notifies listener on first tick count has expired only.`, () => {
    // Arrange
    const initialTickCount = 1;
    let callbackInvocationCount = 0;
    let timer = createTimer(initialTickCount, function () {
      callbackInvocationCount++;
    });

    // Act
    timer = timer.tick();
    timer = timer.tick();

    // Assert
    assert.ok(timer);
    assert.ok(callbackInvocationCount === 1, `it is expected callback has invoked one time.`);
  });

});
