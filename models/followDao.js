//banner数据操作模块

const pool = require('../conf/pool').pool//载入数据库连接池



//获取所有banner
exports.getFollowList = (id, callback)=>{
  //使用连接池获取数据库连接，并进行操作
  pool.getConnection((err,connection)=>{
    if(err){
      callback(err)
    }else{
      connection.query(`SELECT f.user_id_my myId, f.user_id_follow followId, u.head_img src, u.username 'name', l.type FROM 
      b_user u LEFT JOIN b_follow f ON u.id = f.user_id_follow 
      LEFT JOIN b_live_broadcast_info l ON l.user_id = f.user_id_follow 
      WHERE f.user_id_my = ${id}`, (err, rows, fields)=> {
          if (err) throw err
          connection.release()//释放连接
          callback(rows)//执行回调函数
      })
    }
  }) 
}


exports.createFollowInfo = (userId, beFollowId, callback)=>{
  //使用连接池获取数据库连接，并进行操作
  pool.getConnection((err,connection)=>{
    if(err){
      callback(err)
    }else{
      connection.query(`INSERT INTO b_follow (user_id_my, user_id_follow) VALUES (${userId}, ${beFollowId})`, (err, rows, fields)=> {
          if (err) throw err
          connection.release()//释放连接
          callback(rows)//执行回调函数
      })
    }
  }) 
}

exports.deleteFollowInfo = (userId, beFollowId, callback)=>{
  //使用连接池获取数据库连接，并进行操作
  pool.getConnection((err,connection)=>{
    if(err){
      callback(err)
    }else{
      connection.query(`DELETE FROM b_follow WHERE user_id_my = ${userId} AND user_id_follow=${beFollowId}`, (err, rows, fields)=> {
          if (err) throw err
          connection.release()//释放连接
          callback(rows)//执行回调函数
      })
    }
  }) 
}