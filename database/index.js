const pool = require("./connect");
// 自己的封装
function dataConnect() {
    return new Promise((resolve, reject)=> {
        pool.getConnection(function (err, connection){
            if (err) {reject(err);throw err;}
            resolve(connection)
        })
    })
}
// 使用 async和await的封装
let query = function (sql, values) {
    // 返回一个 Promise
    return new Promise((resolve, reject) => {
      pool.getConnection(function (err, connection) {
        if (err) {
          reject(err)
        } else {
          connection.query(sql, values, (err, rows) => {
            if (err) {
              reject(err)
            } else {
              resolve(rows)
            }
            // 结束会话
            connection.release()
          })
        }
      })
    })
  }
  
  module.exports = {
    query,
    dataConnect
  }
