const express = require("express")
const multer = require("multer")
var router = express.Router();
const {Succ, Fail} = require("../util/returnData.js")
// var upload = multer({ dest: './public'})
var storage = multer.diskStorage({
  // 文件存储地址
  destination: function (req, file, cb) {
    cb(null, './public')
  },
  // 文件命名，添加文件后缀
  filename: function (req, file, cb) {
    console.log(file)
    let originalname = file.originalname;
    let aff = originalname.slice(originalname.indexOf("."));
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + aff);
  }
})
var upload = multer({ storage: storage })
router.post("/fileUpload", upload.single('file'), function (req, res, next) {
  console.log("上传成功！")
  res.send(new Succ())
})
module.exports = router