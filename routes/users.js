var express = require('express');
var router = express.Router();
var pool = require("../database/connect");
var dataConnect = require("../database/index")
/* GET users listing. */
router.post('/getUser', function(req, res, next) {
  // res.send('respond with a resource');
  let name = "luffy"
  dataConnect().then(conn => {
    // console.log(conn);
    return new Promise((resolve ,reject) => {
      conn.query(`select * from user where name = "${name}"`, function (error, results, fields) {
        try {
          resolve(results);
          conn.release();
          if (error) throw error;
        } catch (error) {
          reject(error);
        }
      })
    })
  }).then(msg => {
    console.log(msg)
    res.send(msg);
  })
});
router.post('/getUser1', function(req, res, next) {
  // res.send('respond with a resource');
  let name = ["luffy"]
  dataConnect(function (conn) {
    conn.query('select * from user where name = ?', name, function (error, results, fields) {
      res.send(results);
      conn.release();
      if (error) throw error;
    })
  })
});

module.exports = router;
