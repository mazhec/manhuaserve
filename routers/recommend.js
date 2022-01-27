//banner路由模块

var express = require('express')
var bannerDao = require('../models/recommendDao')//载入分类数据操作模块

var router = express.Router()


//处理所有分类请求
router.get('/recommend/all',(req,res)=>{
    bannerDao.getRecommend((data)=>{
        res.json(data)
    })
})

router.get('/recommendLogin/all',(req,res)=>{
    bannerDao.getRecommendLogin(req.user.id, (data)=>{
        res.json(data)
    })
})

module.exports = router;