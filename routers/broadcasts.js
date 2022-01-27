//banner路由模块

var express = require('express')
var broadcastsDao = require('../models/broadcastsDao')//载入分类数据操作模块

var router = express.Router()


//处理所有分类请求
router.get('/broadcasts/all',(req,res)=>{
    broadcastsDao.getBroadcasts((data)=>{
        res.json(data)
    })
})

module.exports = router;