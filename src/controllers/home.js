exports.get = (req, res) => {
  res.render('home');
  console.log(req.session.id);
  console.log('Authenticated:', req.isAuthenticated());
};
