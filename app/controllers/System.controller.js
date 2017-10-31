var System = require('../proxy/System.proxy');
var resUtil  = require("../libs/resUtil");
var Status = require('../../config/env/statusConfig');
var encryption = require("../func/encryption");

/**
 * 系统管理员登陆
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.login = function(req, res, next) {
    if(!req.body.username || !req.body.password) return res.json(resUtil.generateRes(null, Status.BaseState.INVAILD_PARAMS));
    System.login(req.body.username,function(err,rows) {
        if (err) {
            return res.json(resUtil.generateRes(null, Status.BaseState.ERROR));
        }
        if(!rows){
        	//登陆账号不存在
        	return res.json(resUtil.generateRes(null, Status.LoginState.NO_USER));
        }

        var password = encryption.md5(req.body.password,32);
        if(password == rows.password){
            //登陆账号密码都正确
            req.session.administrator = rows;
            req.session.languageType = 1;
            return res.json(resUtil.generateRes(rows, Status.BaseState.SUCCESS));  	  	
        }else{
        	//登陆密码错误
            return res.json(resUtil.generateRes(null, Status.LoginState.PASSWORD_ERROR));
        }      
    })
}


/**
 * 退出后台登陆
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.exit = function(req,res,next) {
    delete req.session.administrator;
    res.json(resUtil.generateRes(null, Status.BaseState.SUCCESS))
}

