module.exports = {
    BaseState: {
        SUCCESS: {
        	code:0,
        	msg:'成功'
        },
        NOTFOUND: {
        	code:1,
        	msg:'没有找到相关数据'
        },
        ERROR: {
        	code:2,
        	msg:'服务器错误'
        },
        INVAILD_PARAMS: {
        	code:3,
        	msg:'上传参数错误'
        },
        DBERROR: {
        	code:4,
        	msg:'数据库错误'
        },
        NO_PERMISSION: {
          code:5,
          msg:'没有权限'
        }
    },
    LoginState: {
       NO_USER: {
           code:1001,
           msg: "登陆用户不存在"
       },
       PASSWORD_ERROR: {
           code:1002,
           msg: '密码不正确'
       }
    }
}