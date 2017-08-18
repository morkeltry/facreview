const connect = require('./db_connection');
const bcrypt = require('bcryptjs');

const post = {};

post.users = (name, email, pw, avatar, callback) => {
  console.log("pw is :",pw)
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

post.reviews = (ws_id, review_value, callback) => {
  const sqlQuery = `
  
    INSERT INTO reviews (ws_id, review_value)
    VALUES ($1, $2);
  `;

  connect.query(sqlQuery, [ws_id, review_value], (err) => {
    if (err) {
      return callback(new Error('Database error while adding new review'));
    }
    callback(null, 'New review added', ws_id);
  });
};

post.votes = (user_id, ws_id, callback) => {
  const sqlQuery = `
    INSERT INTO votes (user_id, ws_id)
    VALUES ($1, $2);
  `;

  connect.query(sqlQuery, [user_id, ws_id], (err) => {
    if (err) {
      return callback(new Error('Database error while adding new vote'));
    }
    callback(null, 'New vote added');
  });
};

post.avg_review = (callback) => {
  const sqlQuery = `
  UPDATE workshops
  SET avg_review = (SELECT AVG(review_value)
                       FROM reviews
                       WHERE reviews.ws_id = workshops.id);
  `;

  connect.query(sqlQuery, (err) => {
    if (err) {
      return callback(new Error('Database error while updating averages'));
    }
    callback(null, 'Average reviews updated');
  });
};

// post.users('Minesh', 'minesh@fac.com', 'test', 'avatar3.jpg', (err, res) => {console.log(res)});
// post.votes(2, 4, (err, res) => {console.log(res)});
// post.avg_review((err, res) => {console.log(res)});
module.exports = post;
