var express = require('express');
var router = express.Router();
var {query, dataConnect} = require("../database/index")
const {Succ, Fail} = require("../util/returnData.js")
/* GET users listing. */
router.post('/getUserByPage',getUserByPage);
async function getUserByPage (req, res, next) {
  // console.log(next)
  let data = {};
  try {
    let {pageNo, pageSize} = req.body
    let offset = pageNo - 1 < 0 ? 0 : pageNo -1
    const user = await query(`select * from user limit ${offset},${pageSize}`);
    const product = await query(`select * from product limit ${offset},${pageSize}`)
    data = new Succ({user, product})
  } catch (error) {
    console.log(error)
    data = new Fail()
  }
  return res.send(data);
  // next();
}
router.post("/deleteUserById", async function (req, res, next) {
  let data = {};
  try {
    let {id} = req.body
    data = await query(`delete from user where id = ?`,id);
    console.log(data)
    if (data.affectedRows > 0) {
      data = new Succ()
    } else {
      data = new Fail();
    }
  }catch (error) {
    console.log(error)
    data = new Fail();
  }
  return res.send(data);
  // next();
})
// 封装前  旧版查询写法
router.post('/getUser1', function(req, res, next) {
  // res.send('respond with a resource');
  let name = ['luffy']
  dataConnect().then(conn => {
    // console.log(conn);
    return new Promise((resolve ,reject) => {
      conn.query(`select * from user where name = ?`, name, function (error, results, fields) {
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
    // console.log(msg)
    res.send(msg);
  })
});

module.exports = router;
