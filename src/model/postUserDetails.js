const connect = require('./db_connection');
const bcrypt = require('bcryptjs');

const post = {};

post.users = (name, email, pw, avatar, callback) => {
  const sqlQuery = `
    INSERT INTO users (name, email, pw, avatar)
    VALUES ($1, $2, $3, $4);
  `;

  connect.query(sqlQuery, [name, email, pw, avatar], (err) => {
    if (err) {
      return callback(new Error('Database error while adding new user'));
    }
    callback(null, 'New user added');
  });
};


module.exports = post;
