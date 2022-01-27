//banner数据操作模块

const pool = require('../conf/pool').pool//载入数据库连接池



//获取所有banner
exports.getchaseplayList = (userId, callback)=>{
  //使用连接池获取数据库连接，并进行操作
  pool.getConnection((err,connection)=>{
    if(err){
      callback(err)
    }else{
      connection.query(`SELECT r.src, r.title name, c.part, c.total, c.isLook FROM b_chaseplays c LEFT JOIN b_recommendlist r ON c.recommendlist_id = r.id WHERE c.user_id = ${userId}`, (err, rows, fields)=> {
          if (err) throw err
          connection.release()//释放连接
          callback(rows)//执行回调函数
      })
    }
  }) 
}