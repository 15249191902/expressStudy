const pool = require("./connect");
function dataConnect(callback) {
    pool.getConnection(function (err, connection){
        if (err) {throw err;}
        callback(connection)
    })
}
module.exports = dataConnect