var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var logger = require('morgan');

var mongoose = require('mongoose');

var passport = require('passport');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var auth = require('./routes/auth');
var api = require('./routes/api');
var cors = require("cors");

var app = express();

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieSession({
    name: 'session',
    keys: ['123']
}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '/client2/dist/')));
//app.use(express.static(path.join(__dirname, 'public')));

// app.use(session({
//   secret: 's3cr3t',
//   resave: true,
//   saveUninitialized: true
// }));

app.use(passport.initialize());
//app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  // NOTE: second true param is making 'hack'
  // so the session will be saved after a page refresh, but it will be destroyed after a server refresh
  done(null, true);
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', auth);
app.use('/api', api);

// Handles any requests that don't match the ones above
// app.get('/page/*', (req,res) =>{
//     res.sendFile(path.join(__dirname+'/client2/dist/'));
// });

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

//mongodb
mongoose.Promoise=global.Promise;

mongoose.connect('mongodb://localhost/test')
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));

module.exports = app;
