//banner数据操作模块

const pool = require('../conf/pool').pool//载入数据库连接池



//获取所有banner
exports.getcategoryItem = (callback)=>{
  //使用连接池获取数据库连接，并进行操作
  pool.getConnection((err,connection)=>{
    if(err){
      callback(err)
    }else{
      connection.query('SELECT * FROM b_category_item', (err, rows, fields)=> {
          if (err) throw err
          connection.release()//释放连接
          callback(rows)//执行回调函数
      })
    }
  }) 
}