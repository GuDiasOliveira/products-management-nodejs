require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const helmet = require('helmet');
const database = require('./database');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoriesRouter = require('./routes/categories');

var app = express();

app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  if (app.locals.db) {
    next();
  } else {
    app.once('database-sync', next);
  }
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);

database().then(db => {
  app.locals.db = db;
  app.emit('database-sync');
  console.log('App ready!');
}).catch(err => {
  console.error('Failed to setup database');
  console.error(err);
  process.exit(1);
});

module.exports = app;
