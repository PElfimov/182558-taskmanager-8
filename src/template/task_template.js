import getHashtagElement from "./hashtag_template";
import getRepeatDayInput from "./repeat_day_input_template";
import getCardColorInput from "./card_colorInput_template";
import {
  MockData
} from "./../mock";

/**
 * Модуль генерации карточки задачи
 * @module
 */
class Task {
  constructor(data) {
    this._title = data.title;
    this._dueDate = data.dueDate;
    this._time = data.time;
    this._tags = data.hashtags;
    this._picture = data.picture;
    this._color = data.color;
    this._isFavorite = data.isFavorite;
    this._isDeadline = data.isDeadline;
    this._repeatingDays = data.repeatingDays;
    this._state = {
      isEdit: false
    };
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).some((it) => it === true);
  }

  get sumRepeatDayInput () {
    let sumDayTemlate=``;
    for (let key in MockData.repeatingDays) {
      if (MockData.repeatingDays.hasOwnProperty(key)) {
        sumDayTemlate += getRepeatDayInput(key, MockData.repeatingDays[key], element.number);
      }
    }
    return sumDayTemlate;
  }

  let sumCardColorInput = ``;
  MockData.color.forEach((elem) => {
    sumCardColorInput += getCardColorInput(elem, element.number);
  });

  let hashtagList = ``;
  element.hashtags.forEach((currentHashtag) => {
    hashtagList = hashtagList + getHashtagElement(currentHashtag);
  });

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
                      </fieldset>
                      <button class="card__repeat-toggle" type="button">
                        repeat:<span class="card__repeat-status">${this._isRepeated() ? `yes` : `no`}</span>
                      </button>
                      <fieldset class="card__repeat-days" ${this._isRepeated() ? `` : `disabled`} >
                        <div class="card__repeat-days-inner">
                          ${sumRepeatDayInput}
                        </div>
                      </fieldset>
                    </div>
                    <div class="card__hashtag">
                      <div class="card__hashtag-list">
                        ${hashtagList}
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
                    ${sumCardColorInput }
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
}

/**
 * Шаблон карточки задачи.
 * @param {object} element Объект с данными для карточки задачи.
 * @return {string} разметка HTML блока с карточкой задачи.
 */
export default (element) => {

  let sumRepeatDayInput = ``;
  for (let key in MockData.repeatingDays) {
    if (MockData.repeatingDays.hasOwnProperty(key)) {
      sumRepeatDayInput += getRepeatDayInput(key, MockData.repeatingDays[key], element.number);
    }
  }

  let sumCardColorInput = ``;
  MockData.color.forEach((elem) => {
    sumCardColorInput += getCardColorInput(elem, element.number);
  });

  let hashtagList = ``;
  element.hashtags.forEach((currentHashtag) => {
    hashtagList = hashtagList + getHashtagElement(currentHashtag);
  });

  return `<article class="card card--${(element.color)} ${(element.isRepeat) ? `card--repeat` : ``}">
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
                    class="card__btn card__btn--favorites ${(!element.isFavorite) ? `card__btn--disabled` : ``}"
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
                    >${element.title}</textarea
                    >
                  </label>
                </div>
                <div class="card__settings">
                  <div class="card__details">
                    <div class="card__dates">
                      <button class="card__date-deadline-toggle" type="button">
                        date: <span class="card__date-status">no</span>
                      </button>
                      <fieldset class="card__date-deadline" ${(element.isDeadline) ? `disabled` : ``}>
                        <label class="card__input-deadline-wrap">
                          <input
                            class="card__date"
                            type="text"
                            placeholder="${element.data}"
                            name="date"
                            value="${element.data}"
                          />
                        </label>
                        <label class="card__input-deadline-wrap">
                          <input
                            class="card__time"
                            type="text"
                            placeholder="${element.time}"
                            name="time"
                            value="${element.time}"
                          />
                        </label>
                      </fieldset>
                      <button class="card__repeat-toggle" type="button">
                        repeat:<span class="card__repeat-status">${(element.isRepeat) ? `yes` : `no`}</span>
                      </button>
                      <fieldset class="card__repeat-days" ${(element.isRepeat) ? `` : `disabled`} >
                        <div class="card__repeat-days-inner">
                          ${sumRepeatDayInput}
                        </div>
                      </fieldset>
                    </div>
                    <div class="card__hashtag">
                      <div class="card__hashtag-list">
                        ${hashtagList}
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
                  <label class="card__img-wrap ${(element.image) ? `` : ` card__img-wrap--empty`}">
                    <input
                      type="file"
                      class="card__img-input visually-hidden"
                      name="img"
                    />
                    <img
                      src="${(element.image) ? element.image : ``}"
                      alt="task picture"
                      class="card__img"
                    />
                  </label>
                  <div class="card__colors-inner">
                    <h3 class="card__colors-title">Color</h3>
                    <div class="card__colors-wrap">
                    ${sumCardColorInput}
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
};
