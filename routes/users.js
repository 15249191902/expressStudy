var express = require('express');
var router = express.Router();
var {query, dataConnect} = require("../database/index")
/* GET users listing. */
router.post('/getUserByPage',getUserByPage);
async function getUserByPage (req, res, next) {
  let data = {};
  try {
    let {pageNo, pageSize} = req.body
    let offset = pageNo - 1 < 0 ? 0 : pageNo -1
    data = await query(`select * from user limit ${offset},${pageSize}`);
  } catch (error) {
    data = {msg: "消息失败"}
  }
  return res.send(data);
  next();
}
router.post("/deleteUserById", async function (req, res, next) {
  let data = {};
  try {
    let {id} = req.body
    data = await query(`delete from user where id = ?`,id);
    if (data.affectedRows > 0) {
      data = {msg: '删除成功！', code: 1}
    } else {
      data = {msg: '删除失败！', code: 0}
    }
  }catch (error) {
    data = {msg: error, code: 0}
  }
  return res.send(data);
  next();
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
