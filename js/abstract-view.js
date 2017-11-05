/** @module abstract-view */

import contentBuilder from './content-builder';


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
  /** Геттер template возвращает шаблон разметки.
   * Метод абстрактный. Должен быть переопределен в объектах-наследниках.
   */
  get template() {
    throw new Error(`You have to define template for view.`);
  }
  /** Создает представление на основе шаблона.
   * @model - модель данных.
   */
  render() {
    this._element = contentBuilder.build(this.template.trim());
  }
  /** Выполняет подписку на события.
   * Предназначен для переорпеделения в производных классах.
   */
  bind() {
  }
  /** Обновляет представление.
   * Предназначен для переорпеделения в производных классах.
   */
  update() {
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
