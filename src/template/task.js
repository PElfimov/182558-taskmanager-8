import Component from './component.js';
/**
 * Модуль генерации карточки задачи
 * @module
 */
export default class Task extends Component {
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
    this._onEdit = null;

    this._onEditButtonClick = this._onEditButtonClick.bind(this);
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).some((it) => it === true);
  }

  _onEditButtonClick() {
    // eslint-disable-next-line no-unused-expressions
    typeof this._onEdit === `function` && this._onEdit();
  }

  set onEdit(fn) {
    this._onEdit = fn;
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
                </div>
              </div>
          </article>`;
  }
  _createElement(template) {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = template;
    return newElement.firstChild;
  }

  bind() {
    this._element.querySelector(`.card__btn--edit`)
      .addEventListener(`click`, this._onEditButtonClick.bind(this));
  }

  unbind() {
    this._element.querySelector(`.card__btn--edit`)
      .removeEventListener(`click`, this._onEditButtonClick);
  }

  update(data) {
    this._title = data.title;
    this._tags = data.tags;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
  }
}
