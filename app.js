var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
const fileUpload = require('express-fileupload');
var cookieSession = require('cookie-session');
require('dotenv').config();

var indexRouter = require('./routes/index');
var uploadRouter = require('./routes/upload');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  fileUpload({
    limits: { fileSize: 3000000 },
    abortOnLimit: true,
    responseOnLimit: 'File Size Limit Exceeded',
  })
);

app.use(
  cookieSession({
    name: 'session',
    keys: ['61645bf4ce5931'],
    maxAge: 60000,
  })
);

app.use('/', indexRouter);
app.use('/upload', uploadRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  if (req.app.get('env') === 'development') {
    res.render('error');
  } else {
    res.render('prodError');
  }
});

module.exports = app;
