// Render current week - will check if authenticated first
const session = require('express-session');

exports.get = (req, res) => {
  // check cookie auth before rendering

  console.log('session id:', req.session.id);
  console.log('cookie is:', req.session.cookie);
  console.log('Authenticated:', req.isAuthenticated());
  console.log('User is ', req.user);
  res.render('current-week');
};


