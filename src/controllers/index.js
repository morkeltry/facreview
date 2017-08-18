const express = require('express');
const path = require('path');
const router = express.Router();

const home = require('./home');
const currentWeek = require('./current-week');
const postLogin = require('./login');
// const postLogout = require('./logout');
// const postReview = require('./post-review');
const error = require('./error');


router.get('/', home.get);
router.post('/login', postLogin.post);
// router.post('/logout', postLogout.post);
// router.post('/post-review', postReview.post);
router.get('/current-week', currentWeek.getCurrentWeek);
router.use(error.client);
router.use(error.server);

module.exports = router;
