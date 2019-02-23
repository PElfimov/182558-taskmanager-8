const FILTERS_NAME = [`all`, `overdue`, `today`, `favorites`, `repeating`, `tags`, `archive`];
const RANDOM_MAX = 10;

import makeFilter from `./make-filter.js`;
import makeTask from `./make-task.js`;

const makeFilterCount = (count) => {
  let filterArray = [0];
  for (let i = 1; i < FILTERS_NAME.length; i++) {
    filterArray[i] = Math.floor(Math.random() * count);
    if (i < FILTERS_NAME.length - 1) {
      filterArray[0] += filterArray[i];
    }
  }
  return filterArray;
};

const removeCard = () => {
  boardTasks.querySelectorAll(`.card`).forEach((elem) => {
    elem.remove();
  });
};

const filtersCount = makeFilterCount(RANDOM_MAX);

const mainFilter = document.querySelector(`.main__filter`);
const boardTasks = document.querySelector(`.board__tasks`);

const makeTasks = (count) => {
  removeCard();
  for (let i = 1; i <= count; i++) {
    boardTasks.insertAdjacentHTML(`afterBegin`, makeTask(i));
  }
};

FILTERS_NAME.forEach((elem, index) => {
  mainFilter.insertAdjacentHTML(`beforeEnd`, makeFilter(elem, filtersCount[index], elem === `all`));
});


makeTasks(filtersCount[0]);

mainFilter.querySelectorAll(`.filter__input`).forEach((elem, index) => {
  elem.addEventListener(`click`, function () {
    makeTasks(filtersCount[index]);

  });
});
