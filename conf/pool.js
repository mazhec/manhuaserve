//数据库连接池

var mysql=require("mysql");//载入mysql模块
//创建连接池
console.log('开始连接数据库')
var pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'bilibili'
});

if (pool) console.log('连接数据库成功')
console.log(pool)


module.exports = {
    pool:pool
}