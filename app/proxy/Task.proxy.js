var mysql = require('../mysql');
var Mapping = require('../../config/env/sqlMapping');

/**
 * 获取指定用户的任务列表
 * @param  {obj}   param   查询参数             
 * @param  {Function} callback 回调函数
 * @return {null}
 */ 
exports.getList = function(param, callback) {
    mysql.query({
    	    sql: "SELECT a.*,b.name AS excutorName,c.number AS roomNumber FROM tbl_task AS a LEFT JOIN tbl_users AS b ON b.idCode = a.executor LEFT JOIN tbl_roominfo AS c ON c.id = a.roomId WHERE a.executor=:idCode AND a.state=:state ORDER BY a.id desc limit :limit_Start,:size ",
            params: {
              "idCode": param.idCode,
              "state": param.state,
              "limit_Start": (param.page - 1) * param.size,
              "size": param.size
            }
        }, function(err, rows) {
        if (err) {
            callback(err, null);
        }

        if (rows && rows.length > 0) {
            callback(null, rows);
        } else {
            callback(null, []);
        }
    })
}