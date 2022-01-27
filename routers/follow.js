//banner路由模块

var express = require('express')
var followDao = require('../models/followDao')//载入分类数据操作模块

var router = express.Router()


//处理所有分类请求
router.get('/follow/all',(req,res)=>{
    followDao.getFollowList(req.user.id, (data)=>{
        // console.log(data)
        res.json(data)
    })
})

router.get('/follow/create/:id',(req,res)=>{
    var userId = req.user.id
    var beFollowId = req.params.id
    if(userId==beFollowId)
    return res.json({msg:'不能关注自己'})
    followDao.createFollowInfo(userId, beFollowId, (data)=>{
        if(data.affectedRows>0){
            res.json({msg:'关注成功'})
        }else{
            res.json({msg:'关注失败'})
        }
    })
})

router.get('/follow/delete/:id',(req,res)=>{
    var userId = req.user.id
    var beFollowId = req.params.id
    console.log('取消关注操作')
    if(userId==beFollowId)
    return res.json({msg:'不能对自己进行操作'})
    followDao.deleteFollowInfo(userId, beFollowId, (data)=>{
        if(data.affectedRows>0){
            res.json({msg:'取关成功'})
        }else{
            res.json({msg:'取关失败'})
        }
        
    })
})

module.exports = router;