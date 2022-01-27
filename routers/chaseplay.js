//banner路由模块

var express = require('express')
var chaseplayDao = require('../models/chaseplayDao')//载入分类数据操作模块

var router = express.Router()


//处理所有分类请求
router.get('/chaseplay/all',(req,res)=>{
    userId = req.user.id
    chaseplayDao.getchaseplayList(userId, (data)=>{
        res.json(data)
        // console.log(data)
    })
})

module.exports = router;