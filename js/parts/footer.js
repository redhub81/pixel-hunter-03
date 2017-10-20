/** @module parts/footer */

import contentBuilder from '../content-builder.js';

const getFooterTemplate = () => `\
  <footer class="footer">
    <a href="https://htmlacademy.ru" class="social-link social-link--academy">HTML Academy</a>
    <span class="footer__made-in">Сделано в <a href="https://htmlacademy.ru" class="footer__link">HTML Academy</a> &copy; 2016</span>
    <div class="footer__social-links">
      <a href="https://twitter.com/htmlacademy_ru" class="social-link  social-link--tw">Твиттер</a>
      <a href="https://www.instagram.com/htmlacademy/" class="social-link  social-link--ins">Инстаграм</a>
      <a href="https://www.facebook.com/htmlacademy" class="social-link  social-link--fb">Фэйсбук</a>
      <a href="https://vk.com/htmlacademy" class="social-link  social-link--vk">Вконтакте</a>
    </div>
  </footer>`;

/* Экспорт интерфейса модуля.
 *************************************************************************************************/

export default {
  /**
   * Возвращает футер игрового экрана.
   * @function
   * @param {object} model - Модель данных.
   * @return {object} - Футер игрового экрана.
   */
  getContent: (model) => {
    const footerTemplate = getFooterTemplate(model);
    const contentElement = contentBuilder.build(footerTemplate);

    return contentElement;
  }
};
