const mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'wl123456',
  database: 'wang'
})
module.exports = connection