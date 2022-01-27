//banner路由模块

var express = require('express')
var bannerDao = require('../models/bannerDao')//载入分类数据操作模块
var url = require("url"); 
var router = express.Router()


//处理所有分类请求
router.get('/banner/all',(req,res)=>{
    bannerDao.getBanner((data)=>{
        res.json(data)
    })
})

router.post('/banner/colse',(req,res)=>{
    // bannerDao.getBanner((data)=>{
    //     res.json(data)
    // })
    // console.log(req.body.unloadFnTime)
    // console.log(req.body.beforeunloadFnTime)
    console.log(req.body.ee)
    console.log("后台接收到请求11122233311")
})

module.exports = router;