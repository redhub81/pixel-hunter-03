/** @module screens/levels/game-one-view */

import {resize} from '../../logic/resize';


export default class ImageViewModel {
  constructor(model, index = 0) {
    const {width: width, height: height} = model;
    this._size = resize({width, height}, model.imageSize);
    this._location = model.location;
    this._alt = `Option ${index + 1}`;
  }
  get size() {
    return this._size;
  }
  get location() {
    return this._location;
  }
  get alt() {
    return this._alt;
  }
}
