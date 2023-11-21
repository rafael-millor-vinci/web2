/* eslint-disable no-console */
const { serialize, parse } = require('../utils/json');

const jsonDbPath = `${__dirname}/../data/films.json`;

const COLLECTION = [];

function readAllFilms(minimumDuration) {
  const orderByDuration = parseInt(minimumDuration, 10);
  let orderedCollection;

  console.log(`order by ${orderByDuration ?? 'not requested'}`);

  const films = parse(jsonDbPath, COLLECTION);

  if (orderByDuration) {
    orderedCollection = [...films].filter((film) => film.duration > orderByDuration);
  }

  console.log('Get FILMS');

  return orderedCollection ?? films;
}

function readOneFilm(id) {
  console.log(`GETddd /films/${id}`);

  const idNumber = Number(id);

  const films = parse(jsonDbPath, COLLECTION);

  const filmId = films.findIndex((film) => film.id === idNumber);

  if (filmId < 0) return undefined;

  return films[filmId];
}

function createOneFilm(title, duration, budget, link) {
  const films = parse(jsonDbPath, COLLECTION);

  const newFilm = {
    id: getNextId(),
    title,
    duration,
    budget,
    link,
  };
  const found = films.find((film) => film.title === title);

  console.log(found);

  if (found) {
    console.log('deja cree');

    return undefined;
  }

  console.log('nouveua');
  films.push(newFilm);
  serialize(jsonDbPath, films);
  return newFilm;
}

function getNextId() {
  const films = parse(jsonDbPath, COLLECTION);
  const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
  if (lastItemIndex === undefined) return 1;
  const lastId = films[lastItemIndex]?.id;
  const nextId = lastId + 1;
  return nextId;
}

function deleteOneFilm(id) {
  const idNumber = parseInt(id, 10);
  const films = parse(jsonDbPath, COLLECTION);
  const filmId = films.findIndex((film) => film.id === idNumber);
  if (filmId < 0) return undefined;
  const itemsRemovedFromCollection = films.splice(filmId, 1);
  const itemRemoved = itemsRemovedFromCollection[0];

  serialize(jsonDbPath, films);

  return itemRemoved;
}

function updateOneFilm(id, propertiesToUpdate) {
  const idNumber = parseInt(id, 10);
  const films = parse(jsonDbPath, COLLECTION);
  const filmId = films.findIndex((film) => film.id === idNumber);
  if (filmId < 0) return undefined;

  const updatedFilm = { ...films[filmId], ...propertiesToUpdate };

  films[filmId] = updatedFilm;

  serialize(jsonDbPath, films);

  return updatedFilm;
}

module.exports = {
  readAllFilms,
  readOneFilm,
  createOneFilm,
  deleteOneFilm,
  updateOneFilm,
};
