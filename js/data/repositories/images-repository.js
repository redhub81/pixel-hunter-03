/** @module data/repositories/images-repository */

import gameConventions from '../../config/game-conventions';
import messageRepository from '../../config/message-repository';
import mathHelper from '../../helpers/math-helper';
import {createImage} from '../factories/levels-factory';

const {ImageType, MessageId} = gameConventions;


const createPhoto = (location, width, height) => createImage(ImageType.PHOTO, location, width, height);
const createPainting = (location, width, height) => createImage(ImageType.PAINTING, location, width, height);

const imageSourcePrefix = `imageSource`;
const createSourceKey = (imageType) => `${imageSourcePrefix}-${imageType}`;
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
  _findSourceImage: (source, location) => {
    return source.find((it) => it.location === location);
  },
  _updateSources: (levels) => {
    if (!levels) {
      return;
    }
    levels.forEach((level) => {
      level.images.forEach((gameImage) => {
        const source = imageSourcesByType[createSourceKey(gameImage.imageType)];
        if (!imagesRepository._findSourceImage(source, gameImage.location)) {
          source.push(createImage(gameImage.imageType, gameImage.location, gameImage.width, gameImage.height));
        }
      });
    });
  },
  _loadImage: (url) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        resolve(image);
      };
      image.onerror = () => {
        reject(messageRepository.getMessage(MessageId.ERROR_NETWORK_IMAGE_NOT_LOADED, {url}));
      };
      image.src = url;
    }).catch((error) => {
      window.console.error(messageRepository.getMessage(MessageId.ERROR_GAME_LEVEL_IMAGE_NOT_LOADED, {error}));
      window.console.warn(messageRepository.getMessage(MessageId.WARNING_CONTINUE_APP_WORKING));
    });
  },
  _prepareImages() {
    return new Promise((resolve) => {
      const photos = imageSourcesByType[createSourceKey(ImageType.PHOTO)];
      const paintings = imageSourcesByType[createSourceKey(ImageType.PAINTING)];
      resolve(photos.concat(paintings));
    });
  },
  loadImages: (levels) => {
    imagesRepository._updateSources(levels);
    return imagesRepository._prepareImages()
        .then((gameImages) => {
          const loadImagePromises = gameImages.map((gameImage) => {
            return imagesRepository._loadImage(gameImage.location)
                .then((image) => {
                  gameImage.imageSize = {width: image.width, height: image.height};
                });
          });
          return Promise.all(loadImagePromises);
        })
        .then(() => {
          levels.forEach((gameLevel) => {
            gameLevel.images.forEach((gameImage) => {
              const source = imageSourcesByType[createSourceKey(gameImage.imageType)];
              const sourceImage = imagesRepository._findSourceImage(source, gameImage.location);
              gameImage.imageSize = (sourceImage)
                ? sourceImage.imageSize
                : {width: gameImage.width, height: gameImage.height};
            });
          });
        });
  },
  getRandomImage(imageType) {
    const imageSource = imageSourcesByType[createSourceKey(imageType)];
    const imageIndex = mathHelper.getRandomInt(0, imageSource.length);
    const sourceImage = imageSource[imageIndex];
    return createImage(sourceImage.imageType, sourceImage.location);
  }
};

export default imagesRepository;
