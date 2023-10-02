/* eslint-disable eqeqeq */
/* eslint-disable no-console */
const express = require('express');
const { serialize, parse } = require('../utils/json');

const router = express.Router();

const jsonDbPath = `${__dirname}/../data/films.json`;

const COLLECTION = [];

router.get('/', (req, res) => {
  const orderByDuration = parseInt(req.query.minimumDuration, 10);

  let orderedCollection;
  console.log(`order by ${orderByDuration ?? 'not requested'}`);

  const films = parse(jsonDbPath, COLLECTION);

  if (orderByDuration) {
    orderedCollection = [...films].filter((film) => film.duration > orderByDuration);
  }

  console.log('Get FILMS');

  res.json(orderedCollection ?? films);
});

router.get('/:id', (req, res) => {
  console.log(`GETddd /films/${req.params.id}`);

  const films = parse(jsonDbPath, COLLECTION);

  
  const filmId = films.findIndex((film) => film.id == req.params.id);

  if (filmId < 0) return res.sendStatus(404);

  return res.json(films[filmId]);
});

router.post('/', (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration?.length !== 0 ? Number(req.body.duration) : undefined;
  const budget = req?.body?.budget?.length !== 0 ? Number(req.body.budget) : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

  console.log('POST /films');

  if (!title || !duration || !budget || !link) return res.sendStatus(400); // error code '400 Bad request'

  const films = parse(jsonDbPath, COLLECTION);

  const found = films.find((film) => film.title == title);

  console.log(found);

  if (found) {
    console.log('deja cree');

    return res.sendStatus(409);
  }

  console.log('nouveua');

  const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? films[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;

  const newFilm = {
    id: nextId,
    title,
    duration,
    budget,
    link,
  };

  films.push(newFilm);

  serialize(jsonDbPath, films);

  return res.json(newFilm);
});

router.delete('/:id', (req, res) => {
  console.log(`DELETE /films/${req.params.id}`);

  const films = parse(jsonDbPath, COLLECTION);
  const foundIndex = films.findIndex((film) => film.id == req.params.id);

  if (foundIndex < 0) return res.sendStatus(404);

  const itemsRemovedFromCollection = films.splice(foundIndex, 1);
  const itemRemoved = itemsRemovedFromCollection[0];

  serialize(jsonDbPath, films);

  return res.json(itemRemoved);
});

router.patch('/:id', (req, res) => {
  console.log(`PATCH /films/${req.params.id}`);

  const title = req?.body?.title;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;
  const link = req?.body?.link;

  console.log('POST /film');

  if ((!title && !link && !duration && !budget) || title?.length === 0 || link?.length === 0)
    return res.sendStatus(400);

  const films = parse(jsonDbPath, COLLECTION);

  const foundIndex = films.findIndex((film) => film.id == req.params.id);

  if (foundIndex < 0) return res.sendStatus(404);

  const updatedFilm = { ...films[foundIndex], ...req.body };

  films[foundIndex] = updatedFilm;

  serialize(jsonDbPath, films);

  return res.json(updatedFilm);
});

router.put('/:id', (req, res) => {
  console.log(`PUT /films/${req.params.id}`);

  const title = req?.body?.title;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;
  const link = req?.body?.link;

  console.log('POST /film');

  if (!title || !link || !duration || !budget || title?.length === 0 || link?.length === 0)
    return res.sendStatus(400);

  const films = parse(jsonDbPath, COLLECTION);

  const foundIndex = films.findIndex((film) => film.id == req.params.id);

  if (foundIndex < 0) {
    const newFilm = {
      id: Number(req.params.id),
      title,
      duration,
      budget,
      link,
    };

    films.push(newFilm);
    serialize(jsonDbPath, films);

    return res.json(newFilm);
  }
  
  const updatedFilm = { ...films[foundIndex], ...req.body };

  films[foundIndex] = updatedFilm;
  serialize(jsonDbPath, films);

  return res.json(updatedFilm);
});

module.exports = router;
