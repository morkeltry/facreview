
exports.get = (req, res) => {
    // check cookie auth before rendering
    req.logOut();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/');
};

