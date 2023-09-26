var express = require('express');
var router = express.Router();

const app = express();
const PORT = 3000;

const COLLECTION = [
    {
        id: 1,
        title:'Mars Attack' ,
        duration:160,
        budget: 4 ,
        link: 'https://www.rottentomatoes.com/m/mars_attacks',

    },
    {
        id: 2,
        title:'RUSH HOUR 2' ,
        duration:90,
        budget: 226 ,
        link: 'https://www.rottentomatoes.com/m/rush_hour_2',

    },
    {
        id: 3,
        title:'MEN IN BLACK II' ,
        duration:88,
        budget: 120 ,
        link: 'https://www.rottentomatoes.com/m/men_in_black_ii',

    },
    {
        id: 4,
        title:'Film Court' ,
        duration:28,
        budget: 120 ,
        link: 'https://www.rottentomatoes.com/m/men_in_black_ii',

    }
];


router.get('/',(req,res)=> {

    const orderByDuration = parseInt(req.query.minimumDuration,10);

    

  let orderedCollection;
  console.log(`order by ${orderByDuration ?? 'not requested'}`);
  
  if (orderByDuration) {

    orderedCollection = [...COLLECTION].filter((COLLECTION) => COLLECTION.duration > orderByDuration);


    
  }


    console.log('Get FILMS');
    
    res.json(orderedCollection ?? COLLECTION);
    

});

router.get('/:id',(req,res) => {

    console.log('GETddd /films/'+req.params.id);

    const filmId =  COLLECTION.findIndex((film) => film.id == req.params.id);

    if (filmId < 0) return res.sendStatus(404);
  
    res.json(COLLECTION[filmId]);
});

router.post('/', (req, res) => {
    const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
    const duration = req?.body?.duration?.length !== 0 ? Number( req.body.duration) : undefined;
    const budget = req?.body?.budget?.length !== 0 ? Number( req.body.budget) : undefined;
    const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;
  
    console.log('POST /films');
  
    if (!title || !duration || !budget || !link) return res.sendStatus(400); // error code '400 Bad request'
    
    const found = COLLECTION.find((COLLECTION) => COLLECTION.title==title);

    console.log(found);


    if (found) {

      console.log("deja cree");

      
      return res.sendStatus(409);
      
      
    } else {

      console.log("nouveua");
    
    const lastItemIndex = COLLECTION?.length !== 0 ? COLLECTION.length - 1 : undefined;
    const lastId = lastItemIndex !== undefined ? COLLECTION[lastItemIndex]?.id : 0;
    const nextId = lastId + 1;
  
    const newPizza = {
      id: nextId,
      title: title,
      duration: duration,
      budget: budget,
      link: link,
    };
  
    COLLECTION.push(newPizza);

    res.json(newPizza);
    }
  });
 


module.exports = router;