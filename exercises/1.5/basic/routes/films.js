var express = require('express');
var router = express.Router();

const app = express();
const PORT = 3000;

const COLLECTION = [
  {
    id: 1,
    title: 'Mars Attack',
    duration: 160,
    budget: 4,
    link: 'https://www.rottentomatoes.com/m/mars_attacks',

  },
  {
    id: 2,
    title: 'RUSH HOUR 2',
    duration: 90,
    budget: 226,
    link: 'https://www.rottentomatoes.com/m/rush_hour_2',

  },
  {
    id: 3,
    title: 'MEN IN BLACK II',
    duration: 88,
    budget: 120,
    link: 'https://www.rottentomatoes.com/m/men_in_black_ii',

  },
  {
    id: 4,
    title: 'Film Court',
    duration: 28,
    budget: 120,
    link: 'https://www.rottentomatoes.com/m/men_in_black_ii',

  }
];


router.get('/', (req, res) => {

  const orderByDuration = parseInt(req.query.minimumDuration, 10);



  let orderedCollection;
  console.log(`order by ${orderByDuration ?? 'not requested'}`);

  if (orderByDuration) {

    orderedCollection = [...COLLECTION].filter((COLLECTION) => COLLECTION.duration > orderByDuration);



  }


  console.log('Get FILMS');

  res.json(orderedCollection ?? COLLECTION);


});

router.get('/:id', (req, res) => {

  console.log('GETddd /films/' + req.params.id);

  const filmId = COLLECTION.findIndex((film) => film.id == req.params.id);

  if (filmId < 0) return res.sendStatus(404);

  res.json(COLLECTION[filmId]);
});

router.post('/', (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration?.length !== 0 ? Number(req.body.duration) : undefined;
  const budget = req?.body?.budget?.length !== 0 ? Number(req.body.budget) : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

  console.log('POST /films');

  if (!title || !duration || !budget || !link) return res.sendStatus(400); // error code '400 Bad request'

  const found = COLLECTION.find((COLLECTION) => COLLECTION.title == title);

  console.log(found);


  if (found) {

    console.log("deja cree");


    return res.sendStatus(409);


  }

  console.log("nouveua");

  const lastItemIndex = COLLECTION?.length !== 0 ? COLLECTION.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? COLLECTION[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;

  const newFilm = {
    id: nextId,
    title: title,
    duration: duration,
    budget: budget,
    link: link,
  };

  COLLECTION.push(newFilm);

  res.json(newFilm);

});

router.delete('/:id', (req, res) => {
  console.log(`DELETE /films/${req.params.id}`);

  const foundIndex = COLLECTION.findIndex(film => film.id == req.params.id);

  if (foundIndex < 0) return res.sendStatus(404);

  const itemsRemovedFromCollection = COLLECTION.splice(foundIndex, 1);
  const itemRemoved = itemsRemovedFromCollection[0];

  res.json(itemRemoved);
});


router.patch('/:id', (req, res) => {
  console.log(`PATCH /films/${req.params.id}`);

  const title = req?.body?.title;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;
  const link = req?.body?.link;

  console.log('POST /film');

  if ((!title && !link && !duration && !budget) || title?.length === 0 || link?.length === 0) return res.sendStatus(400);
  

  const foundIndex = COLLECTION.findIndex(film => film.id == req.params.id);

  if (foundIndex < 0) return res.sendStatus(404);

  const updatedFilm = {...COLLECTION[foundIndex], ...req.body};

  COLLECTION[foundIndex] = updatedFilm;

  res.json(updatedFilm);
});

router.put('/:id', (req, res) => {
  console.log(`PUT /films/${req.params.id}`);

  const title = req?.body?.title;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;
  const link = req?.body?.link;

  console.log('POST /film');

  if ((!title || !link || !duration || !budget) || title?.length === 0 || link?.length === 0) return res.sendStatus(400);
  

  const foundIndex = COLLECTION.findIndex(film => film.id == req.params.id);

  if (foundIndex < 0) {

    const lastItemIndex = COLLECTION?.length !== 0 ? COLLECTION.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? COLLECTION[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;

  const newFilm = {
    id: nextId,
    title: title,
    duration: duration,
    budget: budget,
    link: link,
  };

  COLLECTION.push(newFilm);

  res.json(newFilm);

  }else{

  const updatedFilm = {...COLLECTION[foundIndex], ...req.body};

  COLLECTION[foundIndex] = updatedFilm;

  res.json(updatedFilm);}
});






module.exports = router;