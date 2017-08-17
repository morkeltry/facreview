const connect = require('./db_connection');

const get = {};

get.data = (table, callback) => {
  const sqlQuery = `
    SELECT *
      FROM ${table}
  `;

  connect.query(sqlQuery, (err, response) => {
    if (err) {
      return callback(new Error(`Database error while fetching ${table}`));
    }
    callback(null, response.rows);
  });
};

// get.data('users', (err, res)=>{console.log(res)});
module.exports = get;
