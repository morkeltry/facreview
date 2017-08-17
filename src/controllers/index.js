const express = require('express');
const path = require('path');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// import home route controller
const home = require('./home');
const currentWeek = require('./current-week');
// const User = require('../model/user');
// const getUser = require('../model/get-user-data');
// const postLogout = require('./logout');
// const postReview = require('./post-review');
const error = require('./error');

// add home route
router.get('/', home.get);
// all handlers are here, this happens after your index.js

router.get('/current-week', currentWeek.get);

// all to do with the logging in
// router.post('/',
//   passport.authenticate('local',
//   {successRedirect:'/current-week', failureRedirect:'/', failureFlash: true}
// ));

// router.post('/login',
//   passport.authenticate('local'),
//   function (req, res) {
//     console.log('this function passed');
//     res.redirect('/')
//   }
// );

router.post('/login',
  passport.authenticate('local',
  { successRedirect:'/current-week', failureRedirect:'/'}
));


// router.post('/logout', postLogout.post);
// router.post('/post-review', postReview.post);
router.use(error.client);
router.use(error.server);

module.exports = router;
