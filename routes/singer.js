var express = require('express');
var router = express.Router();
var {query, dataConnect} = require("../database/index")
const {Succ, Fail} = require("../util/returnData.js")
const {getUUID, getCurrTime} = require("../util/util.js")
router.post("/add", async function (req, res, next) {
  try {
    let {user} = req.body
    let {singerName, sex, remark} = user
    let seqId = getUUID();
    let createtime = getCurrTime();
    await query(`insert into singer (seq_id, singer_name, sex, remark, createtime) values (?,?,?,?,?)`,[seqId, singerName, sex, remark, createtime])
    res.send(new Succ())
  }catch (error){
    console.log(error);
    res.send(new Fail())
  }
});
router.post("/list", async function (req, res, next) {
  let data = null;
  try {
    let {pageNo, pageSize} = req.body;
    let offset = pageNo - 1 < 0 ? 0 : pageNo -1;
    list = await query(`select * from singer limit ?,?`, [offset, pageSize]);
    data = new Succ({list});
  } catch (error) {
    console.log(error)
    data = new Fail()
  }
  return res.send(data);
})
router.post("/deleteById", async function (req, res, next) {
  let data = null;
  try {
    let {seqId} = req.body
    await query(`delete from singer where seq_id = ?`, [seqId])
    res.send(new Succ());
  }catch (error) {
    res.send(new Fail());
  }
})
module.exports = router;