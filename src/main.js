import getFilterTemplate from './template/filter_template.js';
import {
  MockData,
  getMockCollection
} from "./mock";
import Task from './template/task.js';
import TaskEdit from './template/task-edit.js';

const RANDOM_MAX = 10;

/**
 * Создание случайной последовательноси счетчика фильра.
 * @param {number} count разрядность счетчика.
 * @return {Array} массив счетчика фильра.
 */
const makeFilterCount = (count) => {
  let filterArray = [0];
  for (let i = 1; i < MockData.FILTERS_NAME.length; i++) {
    filterArray[i] = Math.floor(Math.random() * count);
    if (i < MockData.FILTERS_NAME.length - 1) {
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

/**
 * Вставка списка карточек задачь на страниу.
 * @param {number} count Cards summ.
 */
const makeTasks = (count) => {
  removeCard();
  const element = getMockCollection(count);
  const tasksContainer = document.querySelector(`.board__tasks`);
  for (let i = 0; i < count; i++) {
    const taskComponent = new Task(element[i]);
    const editTaskComponent = new TaskEdit(element[i]);
    tasksContainer.appendChild(taskComponent.render());
    taskComponent.onEdit = () => {
      editTaskComponent.render();
      tasksContainer.replaceChild(editTaskComponent.element, taskComponent.element);
      taskComponent.unrender();
    };

    editTaskComponent.onSubmit = (newObject) => {
      element[i] = {...newObject};

      taskComponent.update(element[i]);
      taskComponent.render();
      tasksContainer.replaceChild(taskComponent.element, editTaskComponent.element);
      editTaskComponent.unrender();
    };
  }

};

MockData.FILTERS_NAME.forEach((elem, index) => {
  mainFilter.insertAdjacentHTML(`beforeEnd`, getFilterTemplate(elem, filtersCount[index], elem === `all`));
});


makeTasks(filtersCount[0]);

mainFilter.querySelectorAll(`.filter__input`).forEach((elem, index) => {
  elem.addEventListener(`click`, function () {
    makeTasks(filtersCount[index]);

  });
});
