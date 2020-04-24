const express = require('express')
const app = express();
const connect = require("./database")
app.get("/",(req, res) => {
  res.send("hello world!")
})
app.get('/getUser',(req, res) => {
  connect.connect()
  connect.query('select * from user limit 0,1', function(err, rows, fields) {
    if (err) {
      throw err;
    }
    res.send(rows)
  })
  connect.end()
})
app.listen(4000, ()=> {
  console.log('example app listen')
})