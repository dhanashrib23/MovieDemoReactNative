const mysql = require("mysql2");

// Create the connection pool.
const conn = mysql.createConnection({
  host: "localhost",
  user: "W2_87323_Dhanashri",
  password: "manager",
  database: "movies_db",
});

module.exports = conn;
