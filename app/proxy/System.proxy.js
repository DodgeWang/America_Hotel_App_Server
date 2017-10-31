var mysql = require('../mysql');

/**
 * 后台管理员登陆
 * @param  {string}   username   用户名     
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.login = function(username,callback) {
   mysql.query({
        sql: "SELECT * FROM tbl_users where username = :username",
        params  : {
           "username": username
        }
    }, function(err, rows) {
        if (err) {
            callback(err, null);
        }

        if (rows && rows.length > 0) {
            callback(null, rows[0]);
        } else {
            callback(null, null);
        }
    })
}