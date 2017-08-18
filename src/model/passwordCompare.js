const bcrypt = require('bcryptjs');
const post = require('./postUserDetails');
const connect = require('./db_connection');

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
