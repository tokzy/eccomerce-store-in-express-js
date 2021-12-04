var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv');
dotenv.config();
var passport = require('passport');
var session = require("express-session");
var redis = require('redis');
var connectRedis = require('connect-redis');
var flash = require('express-flash');
var indexRouter = require('./routes');
var usersRouter = require('./routes/users');

require('./passport_setup.js')(passport);
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var RedisStore = connectRedis(session)
var redisClient = redis.createClient({
    host: process.env.redisHost,
    port: process.env.redisPort
})
redisClient.on('error', function (err) {
    console.log('Could not establish a connection with redis. ' + err);
});
redisClient.on('connect', function (err) {
    console.log('Connected to redis successfully');
});
app.use(passport.initialize());
//Configure session middleware
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.redisSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // if true only transmit cookie over https
        httpOnly: false, // if true prevent client side JS from reading the cookie 
        maxAge: Number(process.env.redisMaxage) // session max age in miliseconds
    }
}));
app.use(flash());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404);
  // respond with html page
  if (req.accepts('html')) {
    res.render('error', { url: req.url });
    return;
  }
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
