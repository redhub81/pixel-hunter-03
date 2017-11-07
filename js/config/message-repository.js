/** @module config/message-repository */

import gameConventions from '../config/game-conventions';

const {MessageId} = gameConventions;


const MessageFactories = {
  [MessageId.WARNING_CONTINUE_APP_WORKING]: () => `Работа приложения будет продолжена.`,
  [MessageId.WARNING_CONTINUE_APP_OFFLINE]: () => `Работа приложения будет продолжена в автономном режиме.`,
  [MessageId.ERROR_LOADER_STATS_NAME_ABSENT]: () => `Не задано имя пользователя.`,
  [MessageId.ERROR_LOADER_STATS_DATA_ABSENT]: () => `Не заданы данные для отправки на сервер.`,
  [MessageId.ERROR_NETWORK_RESPONSE_NOT_OK]: ({status}) => `Сетевой запрос данных не был успешным. Статус ответа: ${status}`,
  [MessageId.ERROR_NETWORK_IMAGE_NOT_LOADED]: ({url}) => `Сетевая ошибка при загрузке изображения по адресу: ${url}`,
  [MessageId.ERROR_UNRECOVERABLE]: () => `Неустранимая ошибка. Продолжение работы программы невозможно.`,
  [MessageId.ERROR_GAME_SAVE]: ({playerName, error}) => `Не удалось сохранить результат игры игрока "${playerName}" на сервер. ${error}`,
  [MessageId.ERROR_GAME_LEVELS_LOADING]: ({error}) => `Не удалось загрузить уровни игры с сервера. ${error}`,
  [MessageId.ERROR_GAME_CANNOT_LOAD_DATA]: ({error}) => `Не удалось загрузить данные игры. ${error}`,
  [MessageId.ERROR_GAME_LEVEL_IMAGE_NOT_LOADED]: ({error}) => `Не удалось загрузить изображение. ${error}`,
  [MessageId.ERROR_GAME_STATS_NOT_LOADED]: ({playerName, error}) => `Не удалось загрузить с сервера результаты предыдущих игр игрока "${playerName}". ${error}`,
};

const messageRepository = {
  getMessage: (errorId, data) => {
    const messageFactory = MessageFactories[errorId];
    return (messageFactory) ? messageFactory(data) : `${data}`;
  }
};

export default messageRepository;
