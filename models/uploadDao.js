//banner数据操作模块

const pool = require('../conf/pool').pool//载入数据库连接池



//获取所有banner
exports.updateHeadImg = (userId, url, callback)=>{
  //使用连接池获取数据库连接，并进行操作
  pool.getConnection((err,connection)=>{
    if(err){
      callback(err)
    }else{
      connection.query(`UPDATE b_user SET head_img = 'http://42.192.48.247:3000/image/headImg/${url}' WHERE id = ${userId}`, (err, rows, fields)=> {
          if (err) throw err
          connection.release()//释放连接
          callback(rows)//执行回调函数
      })
    }
  }) 
}