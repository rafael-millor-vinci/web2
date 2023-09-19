var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var filmsRouter = require('./routes/films');

var app = express();

let TABREQUETE = [];

app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();

    


    TABREQUETE.forEach(element => {
        if (req.path==element.path) {
            if (req.method==element.method) {
                element.nb++

            }else{

                TABREQUETE.push({
                    path:req.path,
                    method:req.method,
                    nb:0
                })
            }

        }else{
            TABREQUETE.push({
                path:req.path,
                method:req.method,
                nb:0 
            })
        }
    });

    console.log(TABREQUETE);

});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/films', filmsRouter);





module.exports = app;
