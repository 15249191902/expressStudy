class Succ {
  constructor () {
    this.status = 0;
    this.message = "请求成功！";
  }
}
class Fail {
  constructor () {
    this.status = 1;
    this.message = "请求失败！"
  }
}
module.exports = {Succ, Fail}