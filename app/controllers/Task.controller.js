var Task = require('../proxy/Task.proxy');
var resUtil  = require("../libs/resUtil");
var Status = require('../../config/env/statusConfig');
var async = require('async');
var timeFunc = require('../func/timeFunc');
var formidable = require('formidable'); //文件上传
var fs = require('fs');
var path = require('path');

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



/**
 * 完成任务并上传资料
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.complete = function(req, res, next){
//   async.waterfall([  
//     function(callback){  
//         callback(null, 'one', 'two');  
//         console.log('1');  
//     },  
//     function(arg1, arg2, callback){  
//         callback(null, 'three');  
//         console.log(arg1);  
//         console.log(arg2);  
//     },  
//     function(arg1, callback){  
//         console.log(arg1);   
//         callback(null, 'done');  
        
//     }  
// ], function (err, result) {  
//     console.log(result);  
     
// });  

   //创建form表单数据的解析对象
　　var form = new formidable.IncomingForm();
   //设置编码
   form.encoding = 'utf-8';
   //设置文件上传之后在服务器端存储的路径
   //__dirname值当前文件所在路径
   //process.cwd()是当前执行node命令时候的文件夹地址
　 form.uploadDir = process.cwd() +"/uploadFile/picture";
   //设置文件上传之后是否保存文件后缀，默认是不保存
　 form.keepExtensions = true;
   //设置单文件大小限制    
   form.maxFieldsSize = 200 * 1024;
   //开始文件上传
   form.parse(req, function (error, fields, files) {
        if (error) return res.json(resUtil.generateRes(null, Status.BaseState.ERROR));
        // console.log("fields内容",fields)
        // console.log("=========================================")
        // console.log("files内容",files)
        var fileList = [];
        for(a in files){
           var nameObj = {}
           //文件上传时间戳
           var t = new Date().getTime();
           //生成随机数
           var ran = parseInt(Math.random() * 8999 + 10000);
           //拿到扩展名
           var extname = path.extname(files[a].name);
           //旧的路径名
           nameObj.oldpath = files[a].path;
           //新的路径名
           nameObj.newpath = process.cwd() + '/uploadFile/picture/' + t + ran + extname;
           fileList.push(nameObj);
        }
        //重新命名所有上传的文件名称
        reName(0,fileList,function(err){
           if(err){
              return res.json(resUtil.generateRes(null, Status.BaseState.ERROR));
           }
           return res.json(resUtil.generateRes(null, Status.BaseState.SUCCESS));
        })
    })
}


function reName(i,fileList,cb){
    fs.rename(fileList[i].oldpath, fileList[i].newpath, function(err) {
            if (err) {
                throw Error("改名失败");
                return cb(err)
            }
            if(i < fileList.length-1){
               i+=1;
               reName(i,fileList,cb);
            }else{
               cb(null)
            }          
    })
}


















