/*
 * Required node packages
 */

var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    hoganExpress = require('hogan-express'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongoose = require('mongoose');

/*
 * Set app as express()
 */

var app = express();

/*
 * Setup session
 */

/*
app.use(session({
    secret: 'shopand_session',
    resave: true,
    saveUninitialized: true
}));
*/

/*
 * Setup passport
 */

/*
app.use(passport.initialize());
app.use(passport.session());

var User = require(path.join(__dirname, 'account/model')).User;

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
*/

/*
 * Setup application port number
 */

app.port = '10101';

/*
 * Setup view engine
 */

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'html');
app.enable('view cache');
app.engine('html', hoganExpress);

/*
 * Setup static files path
 */

app.use('/static', express.static(path.join(__dirname, '../static')));

/*
 * Setup logger, bodyParser, cookieParser and favicon
 */

//app.use(favicon(path.join(__dirname, '../static/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/*
 * Setup routes
 */

var routes = [
    'shop/route'
    //'app_name/route'
];
routes.forEach(function(route){
    require(path.join(__dirname, route))(app);
});

/*
 * Setup mongo DB models
 */

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(){
    var models = [
        //'app_name/model'
    ];
    models.forEach(function(model){
        require(path.join(__dirname, model));
    });
});

mongoose.connect('mongodb://localhost:38716/shopand');

/*
 * Catch 404 and forward to error handler
 */

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/*
 * Handling errors
 */

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;

