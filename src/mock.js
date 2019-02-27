import {getRandomInt, getRandomElement, getNormalDate} from "./utils";

const MAX_HASHTAG_COUNT = 4;

const MockData = {
  FILTERS_NAME: [`all`, `overdue`, `today`, `favorites`, `repeating`, `tags`, `archive`],
  DAY: [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`],
  COLORS: [`black`, `yellow`, `blue`, `green`, `pink`],
  FAVORITE: [true, false],
  REPEAT: [true, false],
  title: [`Изучить теорию.`,
    `Сделать домашку.`,
    `Пройти интенсив на соточку.`,
    `Here is a card with filled data.`,
    ``],
  DEADLINE: [true, false],
  dueDate: (Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000),
  TIMES: [`11:15 PM`, `10:00 AM`, `6:25 PM`, `0:01 AM`, `1:30 PM`, ``],
  IMAGES: [`img/sample-img.jpg`, ``],
  HASHTAGS: [`#repeat`, `#cinema`, `#entertaiment`, `#testing`]
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
    const hashtagData = MockData.HASHTAGS.slice();
    for (let j = 0; j < Math.min(countHashtag, hashtagData.length); j++) {
      const tagIndex = getRandomInt(0, hashtagData.length);
      newHashtags.push(hashtagData[tagIndex]);
      hashtagData.splice(tagIndex, 1);
    }
    const newElement = {
      number: i,
      color: getRandomElement(MockData.COLORS),
      isFavorite: getRandomElement(MockData.FAVORITE),
      isRepeat: getRandomElement(MockData.REPEAT),
      title: getRandomElement(MockData.title),
      isDeadline: getRandomElement(MockData.DEADLINE),
      data: new Date(MockData.dueDate).toDateString(),
      time: getRandomElement(MockData.TIMES),
      image: getRandomElement(MockData.IMAGES),
      hashtags: newHashtags,
    };
    console.log(MockData.dueDate);
    collection.push(newElement);
  }
  return collection;
};

export {MockData, MAX_HASHTAG_COUNT, getMockCollection};
