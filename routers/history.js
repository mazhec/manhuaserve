//banner路由模块

var express = require('express')
var historyDao = require('../models/historyDao')//载入分类数据操作模块
const moment = require('moment')

var router = express.Router()


//处理所有分类请求
router.get('/history/all/:id', (req, res) => {
    var videoId = req.params.id
    var userId = req.user.id
    var browseTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    if (videoId != undefined && videoId != '' && userId != undefined && userId != '') {
        historyDao.createHistoricalRecord(videoId, browseTime, userId, (data) => {
            res.json({ok:true})
        })
    }
})

//处理所有分类请求
router.get('/history/list', (req, res) => {
    historyDao.getHistoricalRecord(req.user.id, (data) => {
        // res.json(data)
        var nowDate = new Date();
        var year = nowDate.getFullYear();
        var month = nowDate.getMonth() + 1;
        var date = nowDate.getDate();
        var elYear;
        var hisYear;
        var elMounth;
        var hisMounth;
        var elDate;
        var hisDate;
        var historyList = []
        // var timestamp=new Date().getTime()
        // console.log('时间戳：'+timestamp)
        data.forEach(element => {
            elYear = new Date(element.time).getFullYear();
            elMounth = new Date(element.time).getMonth() + 1;
            elDate = new Date(element.time).getDate();
            var item = {}
            var history = {
                items: []
            }
            item.id = element.id
            item.src = element.src;
            item.name = element.name;
            item.part = element.part;
            item.drc = element.drc;
            item.time = element.time;
            if ((year == elYear && elMounth == month && elDate == date)) {
                history.day = '今天'
            } else if ((year == elYear && elMounth == month && elDate == date - 1)) {
                history.day = '昨天'
            } else {
                history.day = '更早'
            }
            // history.items.push(item)
            var index = historyList.findIndex((history1) => {
                return history1.day == history.day
            })
            if (index == -1) {
                history.items.push(item)
                historyList.push(history)
            } else {
                history = historyList[index]
                history.items.push(item)
                historyList.splice(index, 1, history)
            }
        });
        res.json(historyList);
    })
})

module.exports = router;