export default (name, count, isChecked = false) => `<input
          type="radio"
          id="filter__${name}"
          class="filter__input visually-hidden"
          name="filter"
          ${ isChecked ? `checked` : `` }
          ${ count === 0 ? `disabled` : ``}
        />
        <label for="filter__${name}" class="filter__label">
          ${name.toUpperCase()} <span class="filter__${name}-count">${count}</span></label
        >`;
