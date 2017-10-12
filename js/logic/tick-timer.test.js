/** @module tick-timer.test */

import assert from 'assert';
import {createTimer} from './tick-timer.js';

describe(`Timer factory:`, () => {
  it(`creates an object with tick method for valid tick count.`, () => {
    // Arrange
    const tickCount = 1;

    // Act
    const timer = createTimer(tickCount);

    // Assert
    assert.ok(timer && typeof timer === `object`, `expected object creation.`);
    assert.ok(timer.tick && typeof timer.tick === `function`,
        `it is expected an object with tick() method has returned from createTimer() function.`);
  });

  it(`throws exception on invalid tick count.`, () => {
    // Arrange
    const invalidTickCount = -1;

    // Act with assert
    assert.throws(() => createTimer(invalidTickCount));
  });
});

describe(`Timer.tick() method:`, () => {
  it(`decreases ticks count by one on each invocation while ticks count greater than zero.`, () => {
    // Arrange
    const initialTickCount = 10;
    let timer = createTimer(initialTickCount);

    // Act and assert
    let tickCount = timer.getTicksCount();
    assert.ok(typeof tickCount === `number`, `expected tickCount is a number.`);

    // Act and assert
    while (tickCount > 0) {
      // Act
      timer = timer.tick();
      const oldTickCount = tickCount;
      tickCount = timer.getTicksCount();

      // Assert
      assert.ok(oldTickCount - tickCount === 1,
          `it is expected tickCount is less than initial tick count.`);
    }
  });

  it(`decreases ticks count not less when zero.`, () => {
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
    const tickCountValues = timers.map((t) => t.getTicksCount());
    assert.deepStrictEqual(tickCountValues, expectedTickCountValues,
        `it is expected tickCount equals to zero on each tick() invocation.`);
  });

  it(`not throws exception on tick count has expired and callback absent.`, () => {
    // Arrange
    const initialTickCount = 1;
    let timer = createTimer(initialTickCount);

    // Act
    assert.doesNotThrow(() => timer.tick());
  });

  it(`timer notifies listener than tick count has expired.`, () => {
    // Arrange
    const initialTickCount = 1;
    let isCallbackInvoked = false;
    let timer = createTimer(initialTickCount, void 0, () => {
      isCallbackInvoked = true;
    });

    // Act
    timer.tick();

    // Assert
    assert.ok(isCallbackInvoked, `it is expected callback has invoked.`);
  });

  it(`notifies listener on first tick count has expired only.`, () => {
    // Arrange
    const initialTickCount = 1;
    let callbackInvocationCount = 0;
    let timer = createTimer(initialTickCount, void 0, () => {
      callbackInvocationCount++;
    });

    // Act
    timer = timer.tick();
    timer = timer.tick();

    // Assert
    assert.ok(timer);
    assert.ok(callbackInvocationCount === 1, `it is expected callback has invoked one time.`);
  });

  it(`notifies listener on each tick.`, () => {
    // Arrange
    const initialTickCount = 2;
    let tickCallbackInvocationCount = 0;
    let timer = createTimer(initialTickCount, () => {
      tickCallbackInvocationCount++;
    }, void 0);

    // Act
    timer.tick();
    timer.tick();

    // Assert
    assert.ok(timer);
    assert.ok(tickCallbackInvocationCount === 2, `it is expected callback has invoked 2 times. tickCallbackInvocationCount = ${tickCallbackInvocationCount}`);
  });

});
