const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const controllers = require('./controllers/index');
// import helpers
// const helpers = require('./views/helpers/index');
const User = require('./model/passwordCompare');
const getUser = require('./model/getUserData');

// Set up express
const app = express();
// Set up handle bars
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine(
  'hbs',
  exphbs({
    extname: 'hbs',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
    defaultLayout: 'main',
    //helpers: helpers,
  }),
);
// Set up JSON parse to be able to parse cookies and other session related activities

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
// Cookie middleware(not used)
app.use(cookieParser());


// express-session - session middleware that sets up session and cookie.
// Will check for authentication automatically
app.use(session({
  secret: process.env.SECRET,
  saveUninitialized: false,
  resave: false,
  // cookie: { maxAge: 0 },
}));



// Passport initialiser (it works with session)
// Start passport up and create a session for it - this is for authentication when logged in
// This will then need to be serialized
app.use(passport.initialize());
app.use(passport.session());
// Set up flash to display error and success messages
app.use(flash());
// Create empty userObject for use later
let userObj = {};

// Start local strategy for local db login system
passport.use(new LocalStrategy(
    // Default params for passport
    (username, password, done) => {
      // First check if email, flash message if there is an error
      getUser.email(username, (err, userObject) => {
        if (err) { return done(err); }
        if (!userObject) {
          return done(null, false, {
            message: 'Unknown Email',
          });
        }
        // Once checked email exists compare password by hashing(async)
        userObj = userObject;
        User.comparePassword(password, userObject.pw, (err, isMatch) => {
          if (err) { return done(err); }
          if (isMatch) {
            console.log('is a match');

            return done(null, userObj);
          }
          console.log('is not a match');
          return done(null, false, {
            message: 'Invalid password',
          });
        });
      });
    }));
// Post login form via 'local' strategy
// Must come right after the passport is used
// Authenticate or redirect
// Display flash message for failure
app.post('/login',
    passport.authenticate('local',
        { successRedirect: '/current-week', failureRedirect: '/', failureFlash: true },
    ));

// User needs to be de/serialized to cooke, this can be used to pull ID for person currently in session
passport.serializeUser((userObj, done) => {
  console.log('userobj', userObj);
  done(null, userObj.id);
});
passport.deserializeUser((id, done) => {
  getUser.id(id, (err, userId) => {
    if (err) { throw err; }
    done(err, userId);
  })
    ;
});
// express validator - set up with basic params
app.use(expressValidator({
  errorFormatter(param, msg, value) {
    const namespace = param.split('.'),
      root = namespace.shift(),
      formParam = root;
    while (namespace.length) {
      formParam += `[${namespace.shift()}]`;
    }
    return {
      param: formParam,
      msg,
      value,
    };
  },
}));


// global variables for flash
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(controllers);

app.set('port', process.env.PORT || 3333);
module.exports = app;
// app.listen(7000,()=>{
//     console.log('It hears you!');
// });
