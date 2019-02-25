/**
 * Шаблон формы для выбора цвета.
 * @param {string} color цвет кнопки.
 * @param {string} number Номер карточки элемента.
 * @return {string} разметка HTML блока формы.
 */
export default (color, number) => `<input
      type="radio"
      id="color-${color}-${number}"
      class="card__color-input card__color-input--${color} visually-hidden"
      name="color"
      value="${color}"/>
    <label
      for="color-${color}-${number}"
      class="card__color card__color--${color}">
      ${color}
    </label>`;
