//banner路由模块

var express = require('express')
var chatDao = require('../models/chatDao')//载入分类数据操作模块
const moment = require('moment')

var router = express.Router()


//处理所有分类请求
router.get('/chat/all',(req,res)=>{
    userId = req.user.id
    chatDao.getChatList(userId, (data)=>{
        var chatInfoLists = [];
        data.forEach(element => {
            var index = chatInfoLists.findIndex((chatInfoList)=>{
                return (element.sent_id == chatInfoList.sentId&&element.receive_id == chatInfoList.receiveId) || (element.sent_id == chatInfoList.receiveId&&element.receive_id == chatInfoList.sentId);
            })
            var chatInfoList;
            var isNew;
            if(index==-1){
                chatInfoList = {};
                chatInfoList.sentId = element.sent_id;
                chatInfoList.receiveId = element.receive_id
                chatInfoList.src = element.head_img;
                chatInfoList.name = element.username;
                chatInfoList.chatInfoLast = element.chat_info;
                chatInfoList.chatTime = moment(element.chat_time).format('YYYY-MM-DD HH:mm:ss')
                isNew = true;
            }else{
                chatInfoList = chatInfoLists[index];
                if(moment(element.chat_time).format('YYYY-MM-DD HH:mm:ss')>chatInfoList.chatTime){
                    chatInfoList.chatInfoLast = element.chat_info;
                }else{
                }
                
                isNew = false;
            }
            if(isNew)
            chatInfoLists.push(chatInfoList)
            else
            chatInfoLists.splice(index,1,chatInfoList)
        });
        res.json(chatInfoLists);
        
    })
})

router.post('/chat/info',(req,res)=>{
    var userId = req.user.id
    var anotherId
    if(userId == req.body.sentId){
        anotherId = req.body.receiveId
    }else if(userId == req.body.receiveId){
        anotherId = req.body.sentId
    }
    chatDao.getChatListItems(userId, anotherId, (data)=>{
        if(data[0].sendId != undefined){
            var chatInfoLists = []
            data.forEach(element => {
                var chatInfoList
                if(element.sendId==userId){
                    chatInfoList = {}
                    chatInfoList.isMyself = false
                }else{
                    chatInfoList={}
                    chatInfoList.isMyself = true
                }
                chatInfoList.username = element.username;
                chatInfoList.src = element.src;
                chatInfoList.content = element.content;
                chatInfoLists.push(chatInfoList)
            });
            res.json(chatInfoLists)
        }else{
            res.json(data)
        }
    })
})

router.post('/chat/create',(req,res)=>{
    var userId = req.user.id
    var anotherId
    var content = req.body.content
    if(userId == req.body.sentId){
        anotherId = req.body.receiveId
    }else if(userId == req.body.receiveId){
        anotherId = req.body.sentId
    }
    chatDao.createChatInfo(userId, anotherId, content, moment(new Date()).format('YYYY-MM-DD HH:mm:ss'), (data) => {
        res.json({ok:true})
    })
})

module.exports = router;