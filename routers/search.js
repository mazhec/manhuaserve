//banner路由模块

var express = require('express')
var searchDao = require('../models/searchDao')//载入分类数据操作模块

var router = express.Router()


//处理所有分类请求
router.get('/category/search',(req,res)=>{
    searchDao.getSearchItemList((data)=>{
        var searchItemsList = [];
        data.forEach(element => {
            //遍历orderList与element.id比较，是否存在
            var index = searchItemsList.findIndex((items1)=>{
                return items1.id == element.id
            })
            var items1;
            var isNew;
            if(index==-1){
                items1 = {
                    items:[]
                }
                items1.id = element.id;
                isNew = true;
            }else{
                items1 = searchItemsList[index];
                isNew = false;
            }
            var item = {};
            item.icon = element.icon;
            item.name = element.name;
            item.color = element.color;
            items1.items.push(item);
            if(isNew)
            searchItemsList.push(items1)
            else
            searchItemsList.splice(index,1,items1)
        });
        res.json(searchItemsList)
    })
})

module.exports = router;