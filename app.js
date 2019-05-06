var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var passport = require('passport');

require('./api/models/db');
require('./api/config/passport');
var usersApi = require('./api/routes/users');
var nasaApi = require('./api/routes/nasa');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// initialize passport for auth
app.use(passport.initialize());
app.get('/auth/google', passport.authenticate('google', { scope: 'https://www.google.com/m8/feeds' }));
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/nasa');
  });

app.use('/api/users', usersApi);
app.use('/api/nasa', nasaApi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// catch auth errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
