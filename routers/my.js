//banner路由模块

var express = require('express')
var myDao = require('../models/myDao')//载入分类数据操作模块

var router = express.Router()


//处理所有分类请求
router.get('/items/all',(req,res)=>{
    myDao.getItemList((data)=>{
        var itemsList = [];
        data.forEach(element => {
            var index = itemsList.findIndex((items1)=>{
                return items1.id == element.id
            })
            var items1;
            var isNew;
            if(index==-1){
                items1 = {
                    items:[]
                }
                items1.id = element.id;
                items1.type = element.type;
                isNew = true;
            }else{
                items1 = itemsList[index];
                isNew = false;
            }
            var item = {};
            item.id = element.id_item
            item.icon = element.icon;
            item.name = element.name;
            item.color = element.color;
            items1.items.push(item);
            if(isNew)
                itemsList.push(items1)
            else
                itemsList.splice(index,1,items1)
        });
        res.json(itemsList);
    })
})

router.get('/user/info',(req,res)=>{
    myDao.getUserInfo(req.user.id, (data)=>{
        res.json(data)
    })
})

module.exports = router;