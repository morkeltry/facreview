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
const User = require('./model/user');
const getUser = require('./model/get-user-data');


const app = express();

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

// this is the middleware that parses the cookies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(cookieParser());


// this is the middleware for express-session
app.use(session({
  secret: 'bella is a good dog',
  saveUninitialized: false,
  resave: false,
  // cookie: { maxAge: 0 },
}));



// Passport initialiser (it works with session)
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// more Passport stuff
let userObj = {};

passport.use(new LocalStrategy(
    (username, password, done) => {
      getUser.email(username, (err, userObject) => {
        if (err) { return done(err); }
        if (!userObject) {
          return done(null, false, {
            message: 'Unknown Email',
          });
        }
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

app.post('/login',
    passport.authenticate('local',
        { successRedirect: '/current-week', failureRedirect: '/', failureFlash: true },
    ));


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
// express validator
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
