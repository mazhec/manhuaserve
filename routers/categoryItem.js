//banner路由模块

var express = require('express')
var categoryItemDao = require('../models/categoryItemDao')//载入分类数据操作模块

var router = express.Router()


//处理所有分类请求
router.get('/category/item',(req,res)=>{
    categoryItemDao.getcategoryItem((data)=>{
        res.json(data)
    })
})

module.exports = router;