/** @module timer.test */

import assert from 'assert';
import Timer from './timer.js';

describe(`Timer factory:`, () => {
  it(`creates an object with tick method for valid tick count.`, () => {
    // Arrange
    const ticksCount = 1;

    // Act
    const timer = new Timer(ticksCount, () => {});

    // Assert
    assert.ok(timer && typeof timer === `object`, `expected object creation.`);
    assert.ok(timer.tick && typeof timer.tick === `function`,
        `it is expected an object with tick() method has returned from createTimer() function.`);
  });

  it(`throws exception on invalid tick count.`, () => {
    // Arrange
    const invalidTicksCount = -1;

    // Act with assert
    assert.throws(() => new Timer(invalidTicksCount, () => {}));
  });
});

describe(`Timer.tick() method:`, () => {
  it(`decreases ticks count by one on each invocation while ticks count greater than zero.`, () => {
    // Arrange
    const initialTicksCount = 10;
    let timer = new Timer(initialTicksCount, () => {});

    // Act and assert
    let ticksCount = timer.getTicksCount();
    assert.ok(typeof ticksCount === `number`, `expected ticksCount is a number.`);

    // Act and assert
    while (ticksCount > 0) {
      // Act
      timer.tick();
      const oldTicksCount = ticksCount;
      ticksCount = timer.getTicksCount();

      // Assert
      assert.ok(oldTicksCount - ticksCount === 1,
          `it is expected ticksCount is less than initial tick count. oldTicksCount = ${oldTicksCount}, ticksCount = ${ticksCount}`);
    }
  });

  it(`decreases ticks count not less when zero.`, () => {
    // Arrange
    const iterations = 2;
    const initialTicksCount = 1;
    const expectedTicksCountValues = new Array(iterations).fill(0);
    let timer = new Timer(initialTicksCount, () => {});

    // Act
    const ticksCountValues = new Array(iterations).fill(null).map(() => {
      timer.tick();
      return timer.getTicksCount();
    });

    // Assert
    assert.deepStrictEqual(ticksCountValues, expectedTicksCountValues,
        `it is expected ticksCount equals to zero on each tick() invocation.`);
  });

  it(`timer notifies listener than tick count has expired.`, () => {
    // Arrange
    const initialTicksCount = 1;
    let isCallbackInvoked = false;
    let timer = new Timer(initialTicksCount, () => {
      isCallbackInvoked = true;
    });

    // Act
    timer.tick();

    // Assert
    assert.ok(isCallbackInvoked, `it is expected callback has invoked.`);
  });

  it(`notifies listener on first tick count has expired only.`, () => {
    // Arrange
    const initialTicksCount = 1;
    let callbackInvocationCount = 0;
    let timer = new Timer(initialTicksCount, () => {
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
