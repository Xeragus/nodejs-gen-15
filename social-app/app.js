const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const postRouter = require('./routes/posts');
const userRouter = require('./routes/users');
const importRouter = require('./routes/importRoute');
const mongoose = require('mongoose');

require('dotenv').config();
// require('./jobs/cronjob');
// job scheduler

const app = express();
mongoose.connect('mongodb://localhost:27017/social-app');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/posts', postRouter);
app.use('/users', userRouter);
app.use('/import', importRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
});

module.exports = app;
