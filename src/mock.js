import {getRandomInt, getRandomElement} from "./utils";
import {getDateCollection, getImageCollection} from "./rnd_element";

const MAX_HASHTAG_COUNT = 3;
const MAX_DATE_COUNT = 6;
const MAX_IMG_COUNT = 20;

const MockData = {
  FILTERS_NAME: [`all`, `overdue`, `today`, `favorites`, `repeating`, `tags`, `archive`],
  repeatingDays: {
    mo: false,
    tu: true,
    we: false,
    th: false,
    fr: false,
    sa: false,
    su: false,
  },
  color: [`black`, `yellow`, `blue`, `green`, `pink`],
  favorite: [true, false],
  ISDONE: [true, false],
  REPEAT: [true, false],
  title: [`Изучить теорию.`,
    `Сделать домашку.`,
    `Пройти интенсив на соточку.`,
    `Here is a card with filled data.`,
    ``
  ],
  deadline: [true, false],
  dueDate: getDateCollection(MAX_DATE_COUNT),
  TIMES: [`11:15 PM`, `10:00 AM`, `6:25 PM`, `0:01 AM`, `1:30 PM`, ``],
  picture: getImageCollection(MAX_IMG_COUNT),
  hashtags: new Set([`homework`, `theory`, `practice`, `intensive`, `keks`]),
};

/**
 * Генерация коллекции случайных карточек задач.
 * @param {number} countCollection количество карточек задач.
 * @return {object} коллекция объектов.
 */
const getMockCollection = (countCollection) => {
  const collection = [];
  for (let i = 0; i < countCollection; i++) {
    const countHashtag = getRandomInt(0, MAX_HASHTAG_COUNT);
    const newHashtags = [];
    const hashtagData = [...MockData.hashtags];
    for (let j = 0; j < Math.min(countHashtag, hashtagData.length); j++) {
      const tagIndex = getRandomInt(0, hashtagData.length);
      newHashtags.push(hashtagData[tagIndex]);
      hashtagData.splice(tagIndex, 1);
    }
    const newElement = {
      number: i,
      color: getRandomElement(MockData.color),
      coloroColect: MockData.color,
      isFavorite: getRandomElement(MockData.favorite),
      repeatingDays: MockData.repeatingDays,
      title: getRandomElement(MockData.title),
      isDeadline: getRandomElement(MockData.deadline),
      dueDate: new Date(getRandomElement(MockData.dueDate)).toDateString(),
      time: getRandomElement(MockData.TIMES),
      image: getRandomElement(MockData.picture),
      hashtags: newHashtags,
    };

    collection.push(newElement);
  }
  return collection;
};

export {
  MockData,
  MAX_HASHTAG_COUNT,
  getMockCollection
};
