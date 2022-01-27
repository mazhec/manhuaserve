//banner路由模块

var express = require('express')
var videoinfoDao = require('../models/videoinfoDao')//载入分类数据操作模块

var router = express.Router()


//处理所有分类请求
router.get('/info/all/:id',(req,res)=>{
    console.log(1111111)
    var id = {}
    console.log(req.params.id)
    id.videoId = req.params.id
    videoinfoDao.getInfo(id, (data)=>{
        res.json(data)
    })
})

router.get('/info1/all/:id',(req,res)=>{
    var id = {}
    id.userId = req.user.id
    id.videoId = req.params.id
    videoinfoDao.getInfo(id, (data)=>{
        res.json(data)
    })
})

module.exports = router;