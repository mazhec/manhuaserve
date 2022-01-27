//banner数据操作模块

const pool = require('../conf/pool').pool//载入数据库连接池



//获取所有banner
exports.getInfo = (id, callback)=>{
  //使用连接池获取数据库连接，并进行操作
  pool.getConnection((err,connection)=>{
    if(err){
      callback(err)
    }else{
      if(id.userId!=undefined&&id.userId!=''){
        connection.query(`SELECT u.id, u.username, r.src videoSrc, r.title, r.text, u.head_img userSrc, (SELECT COUNT(*) FROM b_follow f WHERE f.user_id_my=${id.userId} AND f.user_id_follow=u.id ) 'status' FROM b_recommendlist r LEFT JOIN b_user u ON r.user_id = u.id WHERE r.id = ${id.videoId}`, (err, rows, fields)=> {
          if (err) throw err
          connection.release()//释放连接
          callback(rows)//执行回调函数
        })
      }else{
        connection.query(`SELECT u.username, r.src videoSrc, r.title, r.text, u.head_img userSrc FROM b_recommendlist r LEFT JOIN b_user u ON r.user_id = u.id WHERE r.id = ${id.videoId}`, (err, rows, fields)=> {
            if (err) throw err
            connection.release()//释放连接
            callback(rows)//执行回调函数
        })
      }
    }
  }) 
}