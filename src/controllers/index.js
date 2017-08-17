const express = require('express');
const path = require('path');
const router = express.Router();

// import home route controller
const home = require('./home');
const currentWeek = require('./current-week');
// const postLogin = require('./login');
// const postLogout = require('./logout');
// const postReview = require('./post-review');
const error = require('./error');

// add home route
router.get('/', home.get); //all handlers are here, this happens after your index.js
// router.post('/login', postLogin.post);
// router.post('/logout', postLogout.post);
// router.post('/post-review', postReview.post);
router.get('/current-week', currentWeek.get);
router.use(error.client);  
router.use(error.server);

module.exports = router;
