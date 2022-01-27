//user 数据操作模块

const pool = require('../conf/pool').pool//载入数据库连接池



exports.registerUser = (user, callback)=>{
  //使用连接池获取数据库连接，并进行操作
  pool.getConnection((err,connection)=>{
    if(err){
      callback(err)
    }else{
        var sql = `INSERT INTO b_user(id, username, password, mobile, register_time, head_img) 
                    VALUES(null,'${user.username}', '${user.password}', '${user.mobile}', '${user.resgisterTime}', 'http://42.192.48.247:3000/image/headImg/1.jpg')`
      connection.query(sql, (err, rows, fields)=> {
          if (err) throw err
          connection.release()//释放连接
          callback(rows)//执行回调函数
      })
    }
  }) 
}


exports.login = (username, password, callback)=>{
  //使用连接池获取数据库连接，并进行操作
  pool.getConnection((err,connection)=>{
    if(err){
      callback(err)
    }else{
        var sql = `SELECT * FROM b_user WHERE username = '${username}' AND password = '${password}'`
      connection.query(sql, (err, rows, fields)=> {
          if (err) throw err
          connection.release()//释放连接
          callback(rows)//执行回调函数
      })
    }
  }) 
}


exports.isExist = (username, callback)=>{
    //使用连接池获取数据库连接，并进行操作
    pool.getConnection((err,connection)=>{
      if(err){
        callback(err)
      }else{
          var sql = `SELECT * FROM b_user WHERE username = '${username}'`
        connection.query(sql, (err, rows, fields)=> {
            if (err) throw err
            connection.release()//释放连接
            callback(rows)//执行回调函数 
        })
      }
    }) 
  }