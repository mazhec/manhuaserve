//banner路由模块

var express = require('express')
var commentDao = require('../models/commentDao')//载入分类数据操作模块
const moment = require('moment')
var router = express.Router()


//处理所有分类请求
router.get('/comment/all/:id',(req,res)=>{
    commentDao.getCommentList(req.params.id, (data)=>{
        // console.log(data)
        res.json(data)
    })
})

router.post('/send/comment', (req, res)=>{

    console.log(req.body.commentContent)
    console.log(req.body.videoId)
    console.log(req.user.id)

    // var order = {};
    // order.userId = req.user.id
    // order.total = req.body.total
    // order.createTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss') 
    // order.consigneeId = req.body.consigneeId
    
    // var orderItems = []

    // req.body.goodsList.forEach(goods => {
    //     var orderItem = {}
    //     orderItem.goodsId = goods.goodsId
    //     orderItem.price = goods.price
    //     orderItem.quantity = goods.quantity
    //     orderItems.push(orderItem)
    // });
    var comment = {}
    comment.userId = req.user.id;
    comment.videoId = req.body.videoId;
    comment.commentContent = req.body.commentContent;
    comment.commentTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss') 
    commentDao.createComment(comment, function(data){
        res.json(data)
        // console.log(data)
    })
})

module.exports = router;