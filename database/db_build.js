const fs = require('fs');

const dbConnection = require('../src/model/db_connection');

const sql = fs.readFileSync(`${__dirname}/db_build.sql`).toString();

const runDbBuild = dbConnection.query(sql, (err, res) => {
    if (err) throw err;
    console.log('User and posts tables created with result: ', res);
});

module.export = runDbBuild;
