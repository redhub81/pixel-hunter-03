/** @module config/game-server */

import gameSettings from './game-settings';

const {UriScheme, GameDomain, GameRelativeUrlPath} = gameSettings;


class GameServer {
  constructor(domain, uriScheme = UriScheme.HTTPS, relUrlPath = GameRelativeUrlPath) {
    this._relUrlPath = relUrlPath;
    this._baseUrl = `${uriScheme}://${domain}/${this._relUrlPath.BASE}`;
  }
  static get default() {
    if (!GameServer._default) {
      GameServer._default = new GameServer(GameDomain.HTML_ACADEMY);
    }
    return GameServer._default;
  }
  get baseUrl() {
    return this._baseUrl;
  }
  get questionsUrl() {
    return `${this.baseUrl}/${this._relUrlPath.QUESTIONS}`;
  }
  get statsUrl() {
    return `${this.baseUrl}/${this._relUrlPath.STATS}`;
  }
}

export default GameServer;
