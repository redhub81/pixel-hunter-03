/** @module logic/resize */

export const resize = (frame, given) => {
  const frameHW = frame.height / frame.width;
  const givenHW = given.height / given.width;
  return givenHW / frameHW < 1.0
    ? {width: Math.trunc(frame.width), height: Math.trunc(frame.width * givenHW)}
    : {width: Math.trunc(frame.height / givenHW), height: Math.trunc(frame.height)};
};
