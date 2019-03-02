/**
 * Шаблон хештега.
 * @param {string} nameDay Наименование дня недели.
 * @param {boolean} key повторяется ли задача в этот день.
 * @param {string} number Номер карточки элемента.
 * @return {string} разметка HTML блока формы.
 */
export default (nameDay, key, number) => `<input
    class="visually-hidden card__repeat-day-input"
    type="checkbox"
    id="repeat-${nameDay}-${number}"
    name="repeat"
    value="${nameDay}"/ ${(key) ? `checked` : ``}>
    <label class="card__repeat-day" for="repeat-${nameDay}-${number}"
    >${nameDay}</label
    >`;
