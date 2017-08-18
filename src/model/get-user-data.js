const connect = require('./db_connection');

const getUser = {};

getUser.email = (email, callback) => {
  const sqlQuery = `
    SELECT *
      FROM users
      WHERE email = '${email}'
  `;

  connect.query(sqlQuery, (err, response) => {
    if (err) {
      return callback(new Error('Database error while fetching user'));
    }
    callback(null, response.rows[0]);
  });
};
getUser.id = (id, callback) => {
  const sqlQuery = `
    SELECT *
      FROM users
      WHERE id = '${id}'
  `;

  connect.query(sqlQuery, (err, response) => {
    if (err) {
      return callback(new Error('Database error while fetching user'));
    }
    callback(null, response.rows[0]);
  });
};
// getUser.email('yahia@fac.com', (err, res)=>{console.log(res)});
module.exports = getUser;
