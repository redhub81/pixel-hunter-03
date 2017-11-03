/** @module config/game-server */

import gameSettings from './game-settings';

const {GameDomain, UriScheme} = gameSettings;

class GameServer {
  constructor(uriScheme, domain, gamePath) {
    this._baseUrl = `${uriScheme}://${domain}/${gamePath}`;
  }
  static get default() {
    if (!GameServer._default) {
      GameServer._default = new GameServer(UriScheme.HTTPS, GameDomain.HTML_ACADEMY, `pixel-hunter`);
    }
    return GameServer._default;
  }
  get baseUrl() {
    return this._baseUrl;
  }
  get questionsUrl() {
    return `${this.baseUrl}/questions`;
  }
  get statsUrl() {
    return `${this.baseUrl}/stats`;
  }
}

export default GameServer;
