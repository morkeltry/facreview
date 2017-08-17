const bcrypt = require('bcryptjs');
const post = require('./post');
const connect = require('./db_connection');

exports.createUser = (newUser, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash)=> {
      newUser.password = hash;
      newUser.post.users(newUser.name, newUser.email, newUser.password, newUser.avatar, callback);
    });
  });
};

// exports.getUserByEmail = () => {
//
// };

exports.comparePassword = (candidatePassword, hash, callback) => {

  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) callback(err);
    callback(null, isMatch);
  });
};
// 
// let result = bcrypt.genSalt(10, function(err, salt) {
//   bcrypt.hash('test2', salt, function(err, hash) {
//     console.log(hash);
//   });
// });
// console.log(result);
