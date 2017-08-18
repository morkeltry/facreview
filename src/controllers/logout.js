
exports.get = (req, res) => {
    // check cookie auth before rendering
    // logout
    //flash a message for success
    req.logOut();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/');
};

