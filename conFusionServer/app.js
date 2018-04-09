var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var leaderRouter = require('./routes/leadersRouter');
var promotionsRouter = require('./routes/promotionsRouter');

var app = express();

var url = 'mongodb://localhost:27017/conFusion'
const connect = mongoose.connect(url);
connect.then(() => {
    console.log('connect correctly');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


function auth(req, res, next) {
    console.log(req.headers);
    var authHeader = req.headers.authorization;
    if(!authHeader){
        var err = new Error('You are not authorized!');
        res.setHeader('WWW-Authenticate', 'Basic');// pop up log-in window
        err.status = 401;
        return next(err);
    }

    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString()
        .split(':');
    var user = auth[0];
    var psw = auth[1];
    if(user === 'admin' && psw === 'password'){
        next(); //authorized
    }else{
        var err = new Error('You are not authorized!');
        res.setHeader('WWW-Authenticate', 'Basic');// pop up log-in window
        err.status = 401;
        return next(err);
    }
}

app.use(auth);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', dishRouter);
app.use('/promotions', promotionsRouter);
app.use('/dishes', dishRouter);
app.use('/leaders', leaderRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler (receive next(err) from router)
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
