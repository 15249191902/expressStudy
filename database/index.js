const pool = require("./connect");
function dataConnect() {
    return new Promise((resolve, reject)=> {
        pool.getConnection(function (err, connection){
            if (err) {reject(err);throw err;}
            resolve(connection)
        })
    })
}
module.exports = dataConnect