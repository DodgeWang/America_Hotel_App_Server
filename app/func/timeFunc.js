/**
 * 时间戳和字符串转换
 * @param  {num}   len  生成识别码长度
 * @param  {num}   radix  进制
 * @param  {Function} next the next func
 * @return {null}     
 */


//字符串转时间戳
exports.toStamp = function(timeStr) {
    
    return '';
}



//时间戳转字符串
exports.toStr = function(nS) {
	var d = new Date(parseInt(nS) * 1000);
	var year=d.getFullYear();     
    var month=d.getMonth()+1 < 10 ? "0"+(d.getMonth()+1) : d.getMonth()+1;     
    var date=d.getDate() < 10 ?  "0"+d.getDate() : d.getDate();     
    var hour=d.getHours() < 10 ?  "0"+d.getHours() : d.getHours();     
    var minute=d.getMinutes() < 10 ?  "0"+d.getMinutes() : d.getMinutes();     
    var second=d.getSeconds() < 10 ?  "0"+d.getSeconds() : d.getSeconds();     
    return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
}