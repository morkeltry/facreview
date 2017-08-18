const express = require('express');
const path = require('path');

const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// import home route controller
const home = require('./home');
const currentWeek = require('./current-week');
const logout = require('./logout');
const signup = require('./signup');
const register = require('./register')
// const User = require('../model/user');
// const getUser = require('../model/get-user-email');
// const postLogout = require('./logout');
// const postReview = require('./post-review');
const error = require('./error');

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
    // req.flash('error_msg','You are not logged in');
  res.redirect('/');
};
const ensureLoggedOut = (req, res, next) => {
    if (req.isUnauthenticated()) {
        return next();
    }
    // req.flash('error_msg','You are not logged in');
    res.redirect('/current-week');
};

// add home route
router.get('/', ensureLoggedOut, home.get);
// all handlers are here, this happens after your index.js

router.get('/current-week', ensureAuthenticated, currentWeek.get);
router.get('/logout', logout.get);
router.get('/signup', signup.get);
router.post('/register', register.post);
router.use(error.client);
router.use(error.server);


module.exports = router;
