var System = require('./controllers/System.controller');
var Task = require('./controllers/Task.controller');


module.exports = function(app) {
    /**
     * api routers
     */
    app.post('/api/system/login',System.login);//管理员登陆

    app.get('/api/system/exit',System.exit);  //退出后台系统

    app.get('/api/task/list',Task.getList); //获取任务列表

    
}