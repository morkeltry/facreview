const connect = require('./db_connection');
const getWednesdayDate = require('../controllers/logic/getWednesdayDate');
const get = {};

get.dataWeek = (date, callback) => {
  const endDate = getWednesdayDate(date);
  const sqlQuery = `SELECT * FROM workshops WHERE date BETWEEN '${date}' AND '${endDate}'`;

  connect.query(sqlQuery, (err, response) => {
    if (err) {
      return callback(new Error(`Database error while fetching data, error = ${err}`));
    }
    callback(null, response.rows);
  });
};

// get.data('users', (err, res)=>{console.log(res)});
module.exports = get;
