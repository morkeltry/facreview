const connect = require('./db_connection');

const getUser = {};

getUser.data = (email, callback) => {
  const sqlQuery = `
    SELECT id, email, pw
      FROM users
      WHERE email = '${email}'
  `;

  connect.query(sqlQuery, (err, response) => {
    if (err) {
      return callback(new Error(`Database error while fetching user`));
    }
    callback(null, response.rows[0]);
  });
};

// getUser.data('yahia@fac.com', (err, res)=>{console.log(res)});
module.exports = getUser;
