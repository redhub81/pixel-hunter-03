/** @module main */

import imagesRepository from './data/images-repository.js';
import transition from './transition.js';

imagesRepository.loadImages(() => {
  transition.init();
  transition.goToStartScreen();
});


