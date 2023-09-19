var express = require('express');
var router = express.Router();

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

    }
];


router.get('/',(req,res,next)=> {

    console.log('Get FILMS');
    res.json(COLLECTION);
});

module.exports = router;