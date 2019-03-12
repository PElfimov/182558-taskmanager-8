import Component from './component.js';

/**
 * Модуль генерации карточки задачи
 * @module
 */
export default class TaskEdit extends Component {
  constructor(data) {
    super();
    this._title = data.title;
    this._image = data.image;
    this._dueDate = data.dueDate;
    this._time = data.time;
    this._tags = data.hashtags;
    this._color = data.color;
    this._isFavorite = data.isFavorite;
    this._isDeadline = data.isDeadline;
    this._repeatingDays = data.repeatingDays;
    this._number = data.number;
    this._onSubmit = null;

    this._coloroColect = [`black`, `yellow`, `blue`, `green`, `pink`];

    this._state.isDate = false;
    this._state.isRepeated = false;
    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onChangeDate = this._onChangeDate.bind(this);
    this._onChangeRepeated = this._onChangeRepeated.bind(this);
  }

  _processForm(formData) {
    const entry = {
      title: ``,
      color: ``,
      tags: new Set(),
      dueDate: new Date(),
      repeatingDays: {
        'mo': false,
        'tu': false,
        'we': false,
        'th': false,
        'fr': false,
        'sa': false,
        'su': false,
      }
    };
    const taskEditMapper = TaskEdit.createMapper(entry);

    for (const pair of formData.entries()) {
      const [property, value] = pair;
      taskEditMapper[property] && taskEditMapper[property](value);
    }

    return entry;
  }


  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    const formData = new FormData(this._element.querySelector(`.card__form`));
    const newData = this._processForm(formData);
    typeof this._onSubmit === `function` && this._onSubmit(newData);

    this.update(newData);
  }

  _onChangeDate() {
    this._state.isDate = !this._state.isDate;
    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  _onChangeRepeated() {
    this._state.isRepeated = !this._state.isRepeated;
    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).some((it) => it === true);
  }

  _partialUpdate() {
    this._element.innerHTML = this.template;
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  _sumRepeatDayInput() {
    const repeatDayInputTemplate = (nameDay, key, number) => `<input
    class="visually-hidden card__repeat-day-input"
    type="checkbox"
    id="repeat-${nameDay}-${number}"
    name="repeat"
    value="${nameDay}"/ ${(key) ? `checked` : ``}>
    <label class="card__repeat-day" for="repeat-${nameDay}-${number}"
    >${nameDay}</label
    >`;
    let sumDayTemlate = ``;
    const key = Object.keys(this._repeatingDays);
    const kontext = this;
    key.forEach((elem) => {
      sumDayTemlate += repeatDayInputTemplate(elem, kontext._repeatingDays[elem], kontext._number);
    });

    return sumDayTemlate;
  }

  _hashtagList() {
    /**
     * Шаблон хештега.
     * @param {string} hashtag Наименование хештега.
     * @return {string} разметка HTML блока для хештега.
     */
    const hashtagTamplate = (hashtag) => {
      return `
          <span class="card__hashtag-inner">
            <input
              type="hidden"
              name="hashtag"
              value="repeat"
              class="card__hashtag-hidden-input"
            />
            <button type="button" class="card__hashtag-name">
              #${hashtag}
            </button>
            <button type="button" class="card__hashtag-delete">
              delete
            </button>
          </span>`;
    };

    let hashtagList = ``;
    this._tags.forEach((currentHashtag) => {
      hashtagList = hashtagList + hashtagTamplate(currentHashtag);
    });
    return hashtagList;
  }

  _sumCardColorInput() {
    const getCardColorInput = (color, number) => `<input
    type="radio"
    id="color-${color}-${number}"
    class="card__color-input card__color-input--${color} visually-hidden"
    name="color"
    value="${color}" ${this._color === color && `checked`}/>
  <label
    for="color-${color}-${number}"
    class="card__color card__color--${color}">
    ${color}
  </label>`;
    const context = this;
    let sumCardColorInput = ``;
    this._coloroColect.forEach((elem) => {

      sumCardColorInput += getCardColorInput(elem, context.number);
    });

    return sumCardColorInput;
  }

  get template() {
    return `<article class="card card--edit  card--${(this._color)} ${this._isRepeated() ? `card--repeat` : ``}">
            <form class="card__form" method="get">
              <div class="card__inner">
                <div class="card__control">
                  <button type="button" class="card__btn card__btn--edit">
                    edit
                  </button>
                  <button type="button" class="card__btn card__btn--archive">
                    archive
                  </button>
                  <button
                    type="button"
                    class="card__btn card__btn--favorites ${(!this._isFavorite) ? `card__btn--disabled` : ``}"
                  >
                    favorites
                  </button>
                </div>
                <div class="card__color-bar">
                  <svg class="card__color-bar-wave" width="100%" height="10">
                    <use xlink:href="#wave"></use>
                  </svg>
                </div>
                <div class="card__textarea-wrap">
                  <label>
                    <textarea
                      class="card__text"
                      placeholder="Start typing your text here..."
                      name="text"
                    >${this._title}</textarea
                    >
                  </label>
                </div>
                <div class="card__settings">
                  <div class="card__details">
                    <div class="card__dates">
                      <button class="card__date-deadline-toggle" type="button">
                        date: <span class="card__date-status">${this._state.isDate ? `yes` : `no`}</span>
                      </button>
                      <fieldset class="card__date-deadline" ${!this._state.isDate && `disabled`}>
                        <label class="card__input-deadline-wrap">
                          <input
                            class="card__date"
                            type="text"
                            placeholder="${this._dueDate}"
                            name="date"
                            value="${this._dueDate}"
                          />
                        </label>
                        <label class="card__input-deadline-wrap">
                          <input
                            class="card__time"
                            type="text"
                            placeholder="${this._time}"
                            name="time"
                            value="${this._time}"
                          />
                        </label>
                      </fieldset>
                      <button class="card__repeat-toggle" type="button">
                        repeat:<span class="card__repeat-status">${this._state.isRepeated ? `yes` : `no`}</span>
                      </button>
                      <fieldset class="card__repeat-days" ${!this._state.isRepeated && `disabled`} >
                        <div class="card__repeat-days-inner">
                          ${this._sumRepeatDayInput()}
                        </div>
                      </fieldset>
                    </div>
                    <div class="card__hashtag">
                      <div class="card__hashtag-list">
                        ${this._hashtagList()}
                      </div>
                      <label>
                        <input
                          type="text"
                          class="card__hashtag-input"
                          name="hashtag-input"
                          placeholder="Type new hashtag here"
                        />
                      </label>
                    </div>
                  </div>
                  <label class="card__img-wrap ${(this._image) ? `` : ` card__img-wrap--empty`}">
                    <input
                      type="file"
                      class="card__img-input visually-hidden"
                      name="img"
                    />
                    <img
                      src="${this._image ? this._image : ``}"
                      alt="task picture"
                      class="card__img"
                    />
                  </label>
                  <div class="card__colors-inner">
                    <h3 class="card__colors-title">Color</h3>
                    <div class="card__colors-wrap">
                    ${this._sumCardColorInput() }
                    </div>
                  </div>
                </div>
                <div class="card__status-btns">
                  <button class="card__save" type="submit">save</button>
                  <button class="card__delete" type="button">delete</button>
                </div>
              </div>
            </form>
          </article>`;
  }

  _createElement(template) {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = template;
    return newElement.firstChild;
  }

  bind() {
    this._element.querySelector(`.card__form`)
      .addEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__date-deadline-toggle`)
      .addEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.card__repeat-toggle`)
      .addEventListener(`click`, this._onChangeRepeated);
  }

  unbind() {
    this._element.querySelector(`.card__form`)
      .removeEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__date-deadline-toggle`)
      .removeEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.card__repeat-toggle`)
      .removeEventListener(`click`, this._onChangeRepeated);
  }

  update(data) {
    this._title = data.title;
    this._tags = data.tags;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
    this._dueDate = data.dueDate;
  }

  static createMapper(target) {
    return {
      hashtag: (value) => target.tags.add(value),
      text: (value) => target.title = value,
      color: (value) => target.color = value,
      repeat: (value) => target.repeatingDays[value] = true,
      date: (value) => target.dueDate[value],

    };
  }

}
