require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const favicon = require('express-favicon');

const oidc = require('./utils/oidc');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
app.use(favicon(__dirname + '/public/favicon.ico'))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-session')({
  name:'goPuff.sid',
  secret: 'ksdjhgflaksdgfhaosiuteryawrelkthgalskdfjhgbapsoirguawpresoiujgbhasdfkjgb',
  resave: true,
  saveUninitialized: false
}))

app.use(oidc.router)
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
