var express = require('express');
const { serialize, parse } = require('../utils/json');
var router = express.Router();

const app = express();
const PORT = 3000;

const jsonDbPath = __dirname + '/../films.json';

const COLLECTION = [];


router.get('/', (req, res) => {

  const orderByDuration = parseInt(req.query.minimumDuration, 10);



  let orderedCollection;
  console.log(`order by ${orderByDuration ?? 'not requested'}`);

  const films = parse(jsonDbPath,COLLECTION)

  if (orderByDuration) {

    orderedCollection = [...films].filter((films) => films.duration > orderByDuration);



  }


  console.log('Get FILMS');

  res.json(orderedCollection ?? films);


});

router.get('/:id', (req, res) => {

  console.log('GETddd /films/' + req.params.id);

  const films = parse(jsonDbPath,COLLECTION);

  const filmId = COLLECTION.findIndex((film) => film.id == req.params.id);

  if (filmId < 0) return res.sendStatus(404);

  res.json(films[filmId]);
});

router.post('/', (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration?.length !== 0 ? Number(req.body.duration) : undefined;
  const budget = req?.body?.budget?.length !== 0 ? Number(req.body.budget) : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

  console.log('POST /films');

  if (!title || !duration || !budget || !link) return res.sendStatus(400); // error code '400 Bad request'

  const films = parse(jsonDbPath,COLLECTION);

  const found = films.find((films) => films.title == title);

  console.log(found);


  if (found) {

    console.log("deja cree");


    return res.sendStatus(409);


  }

  console.log("nouveua");

  const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? films[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;

  const newFilm = {
    id: nextId,
    title: title,
    duration: duration,
    budget: budget,
    link: link,
  };

  films.push(newFilm);

  serialize(jsonDbPath,films);

  res.json(newFilm);

});

router.delete('/:id', (req, res) => {
  console.log(`DELETE /films/${req.params.id}`);

  const films = parse(jsonDbPath,COLLECTION);
  const foundIndex = films.findIndex(film => film.id == req.params.id);

  if (foundIndex < 0) return res.sendStatus(404);

  const itemsRemovedFromCollection = films.splice(foundIndex, 1);
  const itemRemoved = itemsRemovedFromCollection[0];

  serialize(jsonDbPath,films);

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
  
  const films = parse(jsonDbPath,COLLECTION);

  const foundIndex = films.findIndex(film => film.id == req.params.id);

  if (foundIndex < 0) return res.sendStatus(404);

  const updatedFilm = {...films[foundIndex], ...req.body};

  films[foundIndex] = updatedFilm;

  serialize(jsonDbPath,films);

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
  
  const films = parse(jsonDbPath,COLLECTION);

  const foundIndex = films.findIndex(film => film.id == req.params.id);

  if (foundIndex < 0) {

    

  const newFilm = {
    id: Number(req.params.id),
    title: title,
    duration: duration,
    budget: budget,
    link: link,
  };

  films.push(newFilm);
  serialize(jsonDbPath,films);

  res.json(newFilm);

  }else{

  const updatedFilm = {...films[foundIndex], ...req.body};

  films[foundIndex] = updatedFilm;
  serialize(jsonDbPath,films);

  res.json(updatedFilm);}
});






module.exports = router;