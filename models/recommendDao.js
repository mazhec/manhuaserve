//banner数据操作模块

const pool = require('../conf/pool').pool//载入数据库连接池



//获取所有banner
exports.getRecommend = (callback) => {
  //使用连接池获取数据库连接，并进行操作
  pool.getConnection((err, connection) => {
    if (err) {
      callback(err)
    } else {
      connection.query(`SELECT r.id, r.src, r.title, r.descr, r.play, r.fabulous, r.typeLeft, r.typeRight, u.username, u.head_img userSrc FROM b_recommendList r LEFT JOIN b_user u ON r.user_id = u.id
      `, (err, rows, fields) => {
        if (err) throw err
        connection.release()//释放连接
        callback(rows)//执行回调函数
      })
    }
  })
}


exports.getRecommendLogin = (userId, callback) => {
  //使用连接池获取数据库连接，并进行操作
  pool.getConnection((err, connection) => {
    if (err) {
      callback(err)
    } else {
      connection.query(`SELECT r.id, r.src, r.title, r.descr, r.play, r.fabulous, r.typeLeft, r.typeRight, u.username, u.head_img userSrc  FROM b_follow f LEFT JOIN b_recommendlist r ON f.user_id_follow = r.user_id LEFT JOIN b_user u ON u.id = f.user_id_follow WHERE f.user_id_my = ${userId}
      `, (err, rows, fields) => {
        if (err) throw err
        connection.release()//释放连接
        callback(rows)//执行回调函数
      })
    }
  })
}