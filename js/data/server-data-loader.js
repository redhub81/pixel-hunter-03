/** @module data/server-data-loader */

import messageRepository from '../config/message-repository';

const {NetworkResponseStatus, MessageId} = messageRepository;


class GameDataLoader {
  init(gameServer) {
    this._gameServer = gameServer;
  }
  loadQuestions() {
    return fetch(`${this._gameServer.questionsUrl}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(messageRepository.getMessage(MessageId.ERROR_NETWORK_RESPONSE_NOT_OK, `${response.status} ${response.statusText}`));
        });
  }
  loadPlayerStats(name) {
    if (!name) {
      throw new Error(messageRepository.getMessage(MessageId.ERROR_LOADER_STATS_NAME_ABSENT));
    }
    return fetch(`${this._gameServer.statsUrl}/${name}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else if (response.status === NetworkResponseStatus.NotFound) {
            return [];
          }
          throw new Error(messageRepository.getMessage(MessageId.ERROR_NETWORK_RESPONSE_NOT_OK, `${response.status} ${response.statusText}`));
        });
  }
  savePlayerStats(name, data) {
    if (!name) {
      throw new Error(messageRepository.getMessage(MessageId.ERROR_LOADER_STATS_NAME_ABSENT));
    }
    if (!data) {
      throw new Error(messageRepository.getMessage(MessageId.ERROR_LOADER_STATS_DATA_ABSENT));
    }
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${this._gameServer.statsUrl}/${name}`, requestSettings)
        .then((response) => {
          if (!response.ok) {
            throw new Error(messageRepository.getMessage(MessageId.ERROR_NETWORK_RESPONSE_NOT_OK, `${response.status} ${response.statusText}`));
          }
        });
  }
}

export default new GameDataLoader();
