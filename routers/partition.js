//banner路由模块

var express = require('express')
var partitionDao = require('../models/partitionDao')//载入分类数据操作模块

var router = express.Router()


//处理所有分类请求
router.get('/partition/all',(req,res)=>{
    partitionDao.getPartitionList((data)=>{
        res.json(data)
    })
})

module.exports = router;