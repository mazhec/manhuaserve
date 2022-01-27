//banner数据操作模块

const pool = require('../conf/pool').pool//载入数据库连接池



//获取所有banner
exports.getCommentList = (videoId, callback)=>{
  //使用连接池获取数据库连接，并进行操作
  pool.getConnection((err,connection)=>{
    if(err){
      callback(err)
    }else{
      connection.query(`SELECT u.head_img src, u.username, c.comment_time time, c.comment_content comment FROM b_comment c LEFT JOIN b_user u ON u.id = c.user_id WHERE c.recommendlist_id = ${videoId}`, (err, rows, fields)=> {
          if (err) throw err
          connection.release()//释放连接
          callback(rows)//执行回调函数
      })
    }
  }) 
}


exports.createComment = (comment, callback)=>{
  //使用连接池获取数据库连接，并进行操作
  pool.getConnection((err,connection)=>{
    if(err){
      callback(err)
    }else{
      connection.query(`INSERT INTO b_comment (user_id, comment_content, recommendlist_id, comment_time) VALUES (${comment.userId}, '${comment.commentContent}', ${comment.videoId}, '${comment.commentTime}')`, (err, rows, fields)=> {
          if (err) throw err
          connection.query(`SELECT u.head_img src, u.username, c.comment_time time, c.comment_content comment FROM b_comment c LEFT JOIN b_user u ON u.id = c.user_id WHERE c.recommendlist_id = ${comment.videoId}  ORDER BY c.comment_time DESC`, (err, rows, fields)=> {
              if (err) throw err
              // connection.release()//释放连接
              callback(rows)//执行回调函数
          })
          connection.release()//释放连接
          // callback(rows)//执行回调函数
      })
    }
  }) 
}