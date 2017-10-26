/** @module screens/abstract-view */

import contentBuilder from './content-builder.js';


/* Экспорт интерфейса модуля.
 *************************************************************************************************/

/**
 * Абстрактный базовый класс для представлений.
 */
export default class AbstractView {
  /** Конструктор.
   * @param {object} model - модель данных.
   */
  constructor(model) {
    this._model = model;
    this._element = null;
  }
  /** Возвращает модель данных.
   * @type {object} */
  get model() {
    return this._model;
  }
  /** Задает модель данных.
   * @param {object} value - Модель данных.
   */
  set model(value) {
    this._model = value;
  }
  /** Геттер template возвращает шаблон разметки.
   * Метод абстрактный. Должен быть переопределен в объектах-наследниках.
   * @return {string} - Строка, содержащая шаблон разметки.
   */
  get template() {
    return ``;
  }
  /** Создает представление на основе шаблона.
   * @model - модель данных.
   */
  render() {
    this._element = contentBuilder.build(this.template);
  }
  /** Выполняет подписку на события.
   * Базовая реализация ничего не делает. */
  bind() {
  }
  /** Создает и инициализирует представление.
   * @return {object} - корневой DOM-элемент представления. */
  getMarkup() {
    this.render();
    this.bind();
    return this._element;
  }
  /** Возвращает DOM-элемент, соответствующий представлению. */
  get element() {
    return this._element ? this._element : (this._element = this.getMarkup());
  }
}
