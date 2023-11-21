/* eslint-disable eqeqeq */
/* eslint-disable no-console */
const express = require('express');
const {
  readAllFilms,
  readOneFilm,
  createOneFilm,
  deleteOneFilm,
  updateOneFilm,
} = require('../models/films');

const router = express.Router();

/* Read all the films from the collection
   GET /films?minimumDuration=? : show minimumDuration
   
*/
router.get('/', (req, res) => {
  const allFilms = readAllFilms(req?.query?.minimumDuration);

  res.json(allFilms);
});

// Read the films identified by an id in the collection
router.get('/:id', (req, res) => {
  const filmFound = readOneFilm(req.params.id);

  if (!filmFound) return res.sendStatus(404);

  return res.json(filmFound);
});

// Create a films to be added to the collection.
router.post('/', (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration?.length !== 0 ? Number(req.body.duration) : undefined;
  const budget = req?.body?.budget?.length !== 0 ? Number(req.body.budget) : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

  console.log('POST /films');

  if (!title || !duration || !budget || !link) return res.sendStatus(400); // error code '400 Bad request'

  const createdFilm = createOneFilm(title, duration, budget, link);

  if (!createdFilm) return res.sendStatus(409);

  return res.json(createdFilm);
});

// Delete a film from the collection based on its id
router.delete('/:id', (req, res) => {
  const itemRemoved = deleteOneFilm(req.params.id);

  if (!itemRemoved) return res.sendStatus(404);

  return res.json(itemRemoved);
});

// Update a film based on its id and new values for its parameters
router.patch('/:id', (req, res) => {
  console.log(`PATCH /films/${req.params.id}`);

  const title = req?.body?.title;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;
  const link = req?.body?.link;

  console.log('POST /film');

  if ((!title && !link && !duration && !budget) || title?.length === 0 || link?.length === 0)
    return res.sendStatus(400);

  const updatedFilm = updateOneFilm(req.params.id, req.body);

  if (!updatedFilm) return res.sendStatus(404);

  return res.json(updatedFilm);
});

// Update a film based on its id and new values for its parameters. Create a new film if nonexistent
router.put('/:id', (req, res) => {
  console.log(`PUT /films/${req.params.id}`);

  const title = req?.body?.title;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;
  const link = req?.body?.link;

  console.log('POST /film');

  if (!title || !link || !duration || !budget || title?.length === 0 || link?.length === 0)
    return res.sendStatus(400);

  const updateedFilm = updateOneFilm(req.params.id, { title, duration, budget, link });

  if (!updateedFilm) {
    const nouveauFilm = createOneFilm(title, duration, budget, link);
    if (!nouveauFilm) return res.sendStatus(409);
    return res.json(nouveauFilm);
  }

  return res.json(updateedFilm);
});

module.exports = router;
