/**
 * Модуль генерации карточки задачи
 * @module
 */
export default class Task {
  constructor(data) {
    this._title = data.title;
    this._image = data.image;
    this._dueDate = data.dueDate;
    this._time = data.time;
    this._tags = data.hashtags;
    this._color = data.color;
    this._coloroColect = data.coloroColect;
    this._isFavorite = data.isFavorite;
    this._isDeadline = data.isDeadline;
    this._repeatingDays = data.repeatingDays;
    this._number = data.number;

    this._element = null;
    this._state = {
      isEdit: false
    };

    this._onEdit = null;
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).some((it) => it === true);
  }

  _onEditButtonClick() {
   typeof this._onEdit === `function` && this._onEdit();
  }

  get element() {
    return this._element;
  }

  set onEdit(fn) {
    this._onEdit = fn;
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

   get template() {
    return `<article class="card card--${(this._color)} ${this._isRepeated() ? `card--repeat` : ``}">
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
                        date: <span class="card__date-status">no</span>
                      </button>
                      <fieldset class="card__date-deadline" ${(this._isDeadline) ? `disabled` : ``}>
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
                      </fieldset>s
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
                </div>
              </div>
            </form>
          </article>`;
  }


  bind() {
    this._element.querySelector(`.card__btn--edit`)
      .addEventListener(`click`, this._onEditButtonClick.bind(this));
  }

  render() {
    const createElement = (template) => {
      const newElement = document.createElement(`div`);
      newElement.innerHTML = template;
      return newElement.firstChild;
    };
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  unbind() {
    this._element.querySelector(`.card__btn--edit`)
      .removeEventListener(`click`, this._onEditButtonClick);
  }

  unrender() {
    this.unbind();
    this._element = null;
  }
}
