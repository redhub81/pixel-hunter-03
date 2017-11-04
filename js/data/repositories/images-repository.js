/** @module data/repositories/images-repository */

import gameConventions from '../../config/game-conventions';
import messageRepository from '../../config/message-repository';
import mathHelper from '../../helpers/math-helper';
import {createImage} from '../factories/levels-factory';

const {ImageType, MessageId} = gameConventions;


const imageSourcePrefix = `imageSource`;
const createSourceKey = (imageType) => `${imageSourcePrefix}-${imageType}`;

const createPhoto = (location, width, height) => createImage(ImageType.PHOTO, location, width, height);
const createPainting = (location, width, height) => createImage(ImageType.PAINTING, location, width, height);

const imageSourcesByType = {
  [createSourceKey(ImageType.PHOTO)]: [
    // People
    createPhoto(`http://i.imgur.com/1KegWPz.jpg`, 0, 0),
    // Animals
    createPhoto(`https://i.imgur.com/DiHM5Zb.jpg`, 0, 0),
    // Nature
    createPhoto(`http://i.imgur.com/DKR1HtB.jpg`, 0, 0),
  ],
  [createSourceKey(ImageType.PAINTING)]: [
    // People
    createPainting(`https://k42.kn3.net/CF42609C8.jpg`, 0, 0),
    // Animals
    createPainting(`https://k42.kn3.net/D2F0370D6.jpg`, 0, 0),
    // Nature
    createPainting(`https://k32.kn3.net/5C7060EC5.jpg`, 0, 0),
  ],
};

const imagesRepository = {
  _updateSources: (levels) => {
    if (!levels) {
      return;
    }
    levels.forEach((level) => {
      level.images.forEach((gameImage) => {
        const source = imageSourcesByType[createSourceKey(gameImage.imageType)];
        if (source.indexOf(gameImage.location) < 0) {
          source.push(createImage(gameImage.imageType, gameImage.location, gameImage.width, gameImage.height));
        }
      });
    });
  },
  _loadImage: (url) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(messageRepository.getMessage(MessageId.ERROR_GAME_LEVEL_IMAGE_NOT_LOADED, {url}));
      image.src = url;
    });
  },
  _prepareImages() {
    return new Promise((resolve) => {
      const photos = imageSourcesByType[createSourceKey(ImageType.PHOTO)];
      const paintings = imageSourcesByType[createSourceKey(ImageType.PAINTING)];
      resolve(photos.concat(paintings));
    });
  },
  loadImages: (levels, onLoadCallback) => {
    imagesRepository._updateSources(levels);
    imagesRepository._prepareImages()
        .then((gameImages) => {
          const loadImagePromises = gameImages.map((gameImage) => imagesRepository._loadImage(gameImage.location));
          return Promise.all(loadImagePromises);
        })
        .then(() => onLoadCallback())
        .catch((error) => {
          window.console.error(messageRepository.getMessage(MessageId.ERROR_GAME_LEVEL_IMAGES_NOT_LOADED, {error}));
          window.console.warn(messageRepository.getMessage(MessageId.WARNING_CONTINUE_APP_WORKING));
        });
  },
  getRandomImage(imageType) {
    const imageSource = imageSourcesByType[createSourceKey(imageType)];
    const imageIndex = mathHelper.getRandomInt(0, imageSource.length);
    return imageSource[imageIndex];
  }
};

export default imagesRepository;
