const mysql = require('mysql2');

var pool = mysql.createPool({
  "user": process.env.MYSQL_USER,
  "database": process.env.MYSQL_DATABASE,  
  "password" : process.env.MYSQL_PASSWORD,
  "host": process.env.MYSQL_HOST,
  "port": process.env.MYSQL_PORT
})

exports.pool = pool;