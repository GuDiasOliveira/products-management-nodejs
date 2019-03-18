require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const helmet = require('helmet');
const database = require('./database');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

database().then(db => {
  app.use('/', indexRouter);
  app.use('/users', usersRouter);
  console.log('API routes ready!');
}).catch(err => {
  console.error('Failed to setup database');
  console.error(err);
  process.exit(1);
});

module.exports = app;
