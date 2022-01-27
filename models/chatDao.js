//banner数据操作模块

const pool = require('../conf/pool').pool//载入数据库连接池



//获取所有banner
exports.getChatList = (userId, callback)=>{
  //使用连接池获取数据库连接，并进行操作
  pool.getConnection((err,connection)=>{
    if(err){
      callback(err)
    }else{
      connection.query(`SELECT u.username, u.head_img, c.sent_id, c.receive_id, c.chat_info, c.chat_time dt FROM b_user u LEFT JOIN b_chat c ON u.id = c.sent_id WHERE c.receive_id = ${userId} UNION ALL
      SELECT u.username, u.head_img, c.sent_id, c.receive_id, c.chat_info, c.chat_time dt FROM b_user u LEFT JOIN b_chat c ON u.id = c.receive_id WHERE c.sent_id = ${userId} ORDER BY dt DESC`, (err, rows, fields)=> {
        if (err) throw err
        connection.release()//释放连接
        callback(rows)//执行回调函数
      })
    }
  }) 
}


exports.getChatListItems = (userId, anotherId, callback)=>{
  //使用连接池获取数据库连接，并进行操作
  pool.getConnection((err,connection)=>{
    if(err){
      callback(err)
    }else{
      connection.query(`SELECT u.username, (SELECT u.head_img FROM b_user u WHERE u.id = ${anotherId}) src, c.sent_id sendId, c.receive_id, c.chat_info content, c.chat_time dt FROM b_user u LEFT JOIN b_chat c ON u.id = c.sent_id WHERE c.sent_id = ${anotherId} AND c.receive_id = ${userId} 
      UNION 
      SELECT u.username, (SELECT u.head_img FROM b_user u WHERE u.id = ${userId}) src, c.sent_id sendId, c.receive_id, c.chat_info content, c.chat_time dt FROM b_user u LEFT JOIN b_chat c ON u.id = c.receive_id WHERE c.sent_id = ${userId} AND c.receive_id = ${anotherId} ORDER BY dt`, (err, rows, fields)=> {
        if (err) throw err
          if(rows.length<1){
            connection.query(`SELECT u.username FROM b_user u WHERE u.id = ${anotherId}`, (err, rows, fields)=> {
              if (err) throw err
              // connection.release()//释放连接
              callback(rows)//执行回调函数
            })
          }else{
            callback(rows)//执行回调函
          }
        connection.release()//释放连接
      })
    }
  }) 
}


exports.createChatInfo = (userId, anotherId, content, chatTime, callback)=>{
  //使用连接池获取数据库连接，并进行操作
  pool.getConnection((err,connection)=>{
    if(err){
      callback(err)
    }else{
      connection.query(`INSERT INTO b_chat (sent_id, receive_id, chat_info, chat_time) VALUES (${userId}, ${anotherId}, '${content}', '${chatTime}')`, (err, rows, fields)=> {
        if (err) throw err
        connection.release()//释放连接
        callback(rows)//执行回调函数
      })
    }
  }) 
}