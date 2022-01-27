//banner数据操作模块

const pool = require('../conf/pool').pool//载入数据库连接池



//获取所有banner
exports.createHistoricalRecord = (videoId, browseTime, userId, callback)=>{
  //使用连接池获取数据库连接，并进行操作
  pool.getConnection((err,connection)=>{
    if(err){
      callback(err)
    }else{
      connection.query(`SELECT * FROM b_history h WHERE h.recommendlist_id = ${videoId} AND h.user_id = ${userId}`, (err, rows, fields)=> {
        if (err) throw err
        // connection.release()//释放连接
        // callback(rows)//执行回调函数
        if(rows.length>0){
          connection.query(`UPDATE b_history h SET browse_time = '${browseTime}' WHERE h.recommendlist_id = ${videoId}`, (err, rows, fields)=> {
            if (err) throw err
            // connection.release()//释放连接
            // callback(rows)//执行回调函数
          })
        }else{
          connection.query(`INSERT INTO b_history (recommendlist_id, browse_time, user_id) VALUES (${videoId}, '${browseTime}', ${userId})`, (err, rows, fields)=> {
            if (err) throw err
            // connection.release()//释放连接
            // callback(rows)//执行回调函数
          })
        }
        connection.release()//释放连接
      })
      
    }
  }) 
}

//获取所有banner
exports.getHistoricalRecord = (userId, callback)=>{
  //使用连接池获取数据库连接，并进行操作
  pool.getConnection((err,connection)=>{
    if(err){
      callback(err)
    }else{
      connection.query(`SELECT r.id, r.src, r.title name, r.descr part, r.typeLeft drc, h.browse_time time FROM b_recommendlist r LEFT JOIN b_history h ON r.id = h.recommendlist_id WHERE h.user_id = ${userId} ORDER BY h.browse_time DESC`, (err, rows, fields)=> {
          if (err) throw err
          connection.release()//释放连接
          callback(rows)//执行回调函数
      })
    }
  }) 
}