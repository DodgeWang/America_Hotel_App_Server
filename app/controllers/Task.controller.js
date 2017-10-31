var Task = require('../proxy/Task.proxy');
var resUtil  = require("../libs/resUtil");
var Status = require('../../config/env/statusConfig');
var async = require('async');
var timeFunc = require('../func/timeFunc');

/**
 * 获取指定用户的任务列表
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.getList = function(req, res, next) {
	req.session.administrator = {
		idCode: "6FE1873C262319A0"
	}
	var param = {
		idCode: req.session.administrator.idCode, //指定用户的idCode
		state: parseInt(req.query.state), //完成状态 0未完成 1完成
		page: parseInt(req.query.page),    //页数
		size: parseInt(req.query.size)  //每页条数	
	}

    Task.getList(param, function(err,rows) {
        if (err) {
            return res.json(resUtil.generateRes(null, Status.BaseState.ERROR));
        }
        
        for(var i=0;i<rows.length;i++){
        	switch(rows[i].taskType)
             {
             case 1:
               rows[i].taskTypeStr = "保洁"
               break;
             case 2:
               rows[i].taskTypeStr = "查房"
               break;
             case 3:
               rows[i].taskTypeStr = "报修"
               break;
             default:
               rows[i].taskTypeStr = "其他"
             }
            rows[i].createTimeStr = timeFunc.toStr(rows[i].createTime);
        }
        res.json(resUtil.generateRes(rows, Status.BaseState.SUCCESS));       
    })
}