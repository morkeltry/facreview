 const post = require('../model/post');
 const bcrypt = require('bcryptjs');

 exports.post = (req, res) => {
   const name = req.body.name;
   const email = req.body.email;
   const password = req.body.password;
   const password2 = req.body.password2;
   const avatar = req.body.avatar;

   req.checkBody('name', 'Name is required').notEmpty();
   req.checkBody('email', 'Email is required').notEmpty();
   req.checkBody('email', 'Email is not valid').isEmail();
   req.checkBody('password', 'Password is required').notEmpty();
   req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

   const errors = req.validationErrors();
   if (errors) {
     res.render('signup', {
       errors,
     });
   } else {
     console.log(req.body.avatar);
     bcrypt.genSalt(10, (err, salt) => {
       bcrypt.hash(req.body.password, salt, (err, hash) => {
         console.log("hash is:",hash);
         req.body.password = hash;
         console.log(req.body.password, 'is new pw');
         post.users(req.body.name, req.body.email, hash, req.body.avatar, (err, res) => {
           if (err) { console.log('DBerror', err); } else {
             console.log(res);
           }
         });

         req.flash('success_msg', 'You are registered and can now login');

         res.redirect('/');
       });
     });
   }
   console.log('errors:', errors);
   console.log('req:', req.body);
 };
