var express = require('express');
var router = express.Router();
var dataConnect = require("../database/index")
/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  dataConnect(function (conn) {
    conn.query(`select * from user limit 0,1`, function (error, results, fields){
      console.log(results);
      // console.log(fields)
      res.send(results);
      conn.release();
      if (error) throw error;
    })
  })
});

module.exports = router;
