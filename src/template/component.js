import moment from "moment";

export default class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate BaseComponent, only concrete one.`);
    }

    this._element = null;
    this._state = {};
  }

  get element() {
    return this._element;
  }

  get cardDate() {
    return moment(this._dueDate).format(`MMMM D, YYYY`);
  }
  get cardTime() {
    return moment(this._dueDate).format(`h:mm A`);
  }

  get template() {
    throw new Error(`You have to define template.`);
  }

  render() {
    this._element = this._createElement(this.template);
    this.bind();
    return this._element;
  }

  bind() {}

  unbind() {}

  unrender() {
    this.unbind();
    this._element.remove();
    this._element = null;
  }

  update() {}


}
