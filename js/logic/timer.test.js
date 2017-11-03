/** @module logic/timer.test */

import assert from 'assert';
import Timer from './timer';

describe(`Timer factory:`, () => {
  it(`creates an object with tick method for valid tick count.`, () => {
    // Arrange
    const TICKS_COUNT = 1;

    // Act
    const timer = new Timer(TICKS_COUNT, () => {});

    // Assert
    assert.ok(timer && typeof timer === `object`, `expected object creation.`);
    assert.ok(timer.tick && typeof timer.tick === `function`,
        `it is expected an object with tick() method has returned from createTimer() function.`);
  });

  it(`throws exception on invalid tick count.`, () => {
    // Arrange
    const INVALID_TICKS_COUNT = -1;

    // Act with assert
    assert.throws(() => new Timer(INVALID_TICKS_COUNT, () => {}));
  });
});

describe(`Timer.tick() method:`, () => {
  it(`decreases ticks count by one on each invocation while ticks count greater than zero.`, () => {
    // Arrange
    const INITIAL_TICKS_COUNT = 10;
    let timer = new Timer(INITIAL_TICKS_COUNT, () => {});

    // Act and assert
    let ticksCount = timer.ticksCount;
    assert.ok(typeof ticksCount === `number`, `expected ticksCount is a number.`);

    // Act and assert
    while (ticksCount > 0) {
      // Act
      timer.tick();
      const oldTicksCount = ticksCount;
      ticksCount = timer.ticksCount;

      // Assert
      assert.ok(oldTicksCount - ticksCount === 1,
          `it is expected ticksCount is less than initial tick count. oldTicksCount = ${oldTicksCount}, ticksCount = ${ticksCount}`);
    }
  });

  it(`decreases ticks count not less when zero.`, () => {
    // Arrange
    const ITERATIONS = 2;
    const INITIAL_TICKS_COUNT = 1;
    const expectedTicksCountValues = new Array(ITERATIONS).fill(0);
    let timer = new Timer(INITIAL_TICKS_COUNT, () => {});

    // Act
    const ticksCountValues = new Array(ITERATIONS).fill(null).map(() => {
      timer.tick();
      return timer.ticksCount;
    });

    // Assert
    assert.deepStrictEqual(ticksCountValues, expectedTicksCountValues,
        `it is expected ticksCount equals to zero on each tick() invocation.`);
  });

  it(`timer notifies listener than tick count has expired.`, () => {
    // Arrange
    const INITIAL_TICKS_COUNT = 1;
    let isCallbackInvoked = false;
    let timer = new Timer(INITIAL_TICKS_COUNT, () => {
      isCallbackInvoked = true;
    });

    // Act
    timer.tick();

    // Assert
    assert.ok(isCallbackInvoked, `it is expected callback has invoked.`);
  });

  it(`notifies listener on first tick count has expired only.`, () => {
    // Arrange
    const INITIAL_TICKS_COUNT = 1;
    let callbackInvocationCount = 0;
    let timer = new Timer(INITIAL_TICKS_COUNT, () => {
      callbackInvocationCount++;
    });

    // Act
    timer.tick();
    timer.tick();

    // Assert
    assert.ok(timer);
    assert.ok(callbackInvocationCount === 1, `it is expected callback has invoked one time.`);
  });
});
