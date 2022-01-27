//banner路由模块

var express = require('express')
var videoDao = require('../models/videoDao')//载入分类数据操作模块

var router = express.Router()


//处理所有分类请求
router.get('/category/video',(req,res)=>{
    videoDao.getVideoList((data)=>{
        res.json(data)
    })
})

router.get('/video/:id',(req,res)=>{
    videoDao.getVideo(req.params.id, (data)=>{
        res.json(data)
        // console.log(data)
    })
})

module.exports = router;