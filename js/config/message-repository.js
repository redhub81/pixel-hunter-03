/** @module config/message-repository */

import gameConventions from '../config/game-conventions';

const {MessageId} = gameConventions;

const MessageFactories = {
  [MessageId.WARNING_CONTINUE_APP_WORKING]: () => `Работа приложения будет продолжена.`,
  [MessageId.WARNING_CONTINUE_APP_OFFLINE]: () => `Работа приложения будет продолжена в автономном режиме.`,
  [MessageId.ERROR_UNRECOVERABLE]: () => `Неустранимая ошибка. Продолжение работы программы невозможно.`,
  [MessageId.ERROR_GAME_SAVE]: ({playerName, error}) => `Не удалось сохранить результат игры игрока "${playerName}" на сервер из-за ошибки: ${error}`,
  [MessageId.ERROR_GAME_LEVELS_LOADING]: ({error}) => `Не удалось загрузить уровни игры с сервера из-за ошибки: ${error}`,
  [MessageId.ERROR_GAME_CANNOT_LOAD_DATA]: ({error}) => `Не удалось загрузить данные игры из-за ошибки: ${error}`,
  [MessageId.ERROR_GAME_LEVEL_IMAGE_NOT_LOADED]: ({url}) => `Не удалось загрузить изображение: ${url}`,
  [MessageId.ERROR_GAME_LEVEL_IMAGES_NOT_LOADED]: ({error}) => `Не удалось загрузить изображения уровней из-за ошибки: ${error}`,
  [MessageId.ERROR_GAME_STATS_NOT_LOADED]: ({playerName, error}) => `Не удалось загрузить с сервера результаты предыдущих игр игрока "${playerName}" из-за ошибки: ${error}`,
};

const messageRepository = {
  getMessage: (errorId, data) => {
    const messageFactory = MessageFactories[errorId];
    const message = (messageFactory) ? messageFactory(data) : ``;
    return message;
  }
};

export default messageRepository;
