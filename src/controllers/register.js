 const post = require('../model/postUserDetails');
 const bcrypt = require('bcryptjs');

 exports.post = (req, res) => {
   const name = req.body.name;
   const email = req.body.email;
   const password = req.body.password;
   const password2 = req.body.password2;
   const avatar = req.body.avatar;

   // Run validator checks from express-validator
   req.checkBody('name', 'Name is required').notEmpty();
   req.checkBody('email', 'Email is required').notEmpty();
   req.checkBody('email', 'Email is not valid').isEmail();
   req.checkBody('password', 'Password is required').notEmpty();
   req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
  re.checkBody('avatar', 'Avatar is not empty').notEmpty();
   const errors = req.validationErrors();
   // if errors send an error and go to the sign up page again
   if (errors) {
     res.render('signup', {
       errors,
     });
   } else {
     // If success hash password and add to db and display flash message
     bcrypt.genSalt(10, (err, salt) => {
       bcrypt.hash(req.body.password, salt, (err, hash) => {
         req.body.password = hash;
         post.users(req.body.name, req.body.email, hash, req.body.avatar, (err, res) => {
           if (err) { console.log('DBerror', err); } else {
           }
         });

         req.flash('success_msg', 'You are registered and can now login');

         res.redirect('/');
       });
     });
   }

 };
