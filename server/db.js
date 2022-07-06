const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "chat",
  multipleStatements: true,
});

connection.connect((error) => {
  if (error) throw error;
  console.log("DB CONNECTED");
});

module.exports = connection;
