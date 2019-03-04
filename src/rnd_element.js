/**
 * Генерация коллекции cлуяайных дат в пределах недели от текущей даты.
 * @param {number} countCollection количество генерируемых элементов.
 * @return {Array} массив дат в.
 */
const getDateCollection = (countCollection) => {
  const collection = [];
  for (let i = 0; i < countCollection; i++) {
    collection.push(Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000);
  }
  return collection;

};

/**
 * Генерация коллекции cлуяайных адресов картинок.
 * @param {number} countCollection количество генерируемых элементов.
 * @return {Array} массив аресов.
 */
const getImageCollection = (countCollection) => {
  const collection = [];
  for (let i = 0; i < countCollection; i++) {
    collection.push(`http://picsum.photos/100/100?r=${Math.random()}`);
  }
  collection.push(``);
  return collection;
};

export {getDateCollection, getImageCollection};
