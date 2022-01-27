//分类路由模块

var express = require('express')
var categoryDao = require('../models/categoryDao')//载入分类数据操作模块

var router = express.Router()


//处理所有分类请求
router.get('/category/all',(req,res)=>{
    categoryDao.getAll((data)=>{
        res.json(data)
    })
})

module.exports = router;