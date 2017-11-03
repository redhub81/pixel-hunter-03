/** @module data/game-data-loader */

class GameDataLoader {
  constructor(gameServer) {
    this._gameServer = gameServer;
  }
  loadQuestions() {
    return fetch(`${this._gameServer.questionsUrl}`).then((res) => res.json());
  }
  loadPlayerStats(name) {
    if (!name) {
      throw new Error(`Не задано имя пользователя для получения статистики.`);
    }
    return fetch(`${this._gameServer.statsUrl}/${name}`).then((res) => res.json());
  }
  savePlayerStats(name, data) {
    if (!name) {
      throw new Error(`Не задано имя пользователя для отправки статистики.`);
    }
    if (!data) {
      throw new Error(`Не заданы данные для отправки на сервер.`);
    }
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${this._gameServer.statsUrl}/${name}`, requestSettings);
  }
}

export default GameDataLoader;
