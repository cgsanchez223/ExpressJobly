"use strict";
/** Database setup for jobly. */
const { Client } = require("pg");
// const { getDatabaseUri } = require("./config");
const { DB_USERNAME, DB_PASSWORD, DB_URI, PORT } = require("./config");

let db;
db = new Client({
  user: DB_USERNAME,
  host: 'localhost',
  password: DB_PASSWORD,
  database: DB_URI
})

// if (process.env.NODE_ENV === "production") {
//   db = new Client({
//     connectionString: getDatabaseUri(),
//     ssl: {
//       rejectUnauthorized: false
//     }
//   });
// } else {
//   db = new Client({
//     connectionString: getDatabaseUri()
//   });
// }

db.connect();

module.exports = db;