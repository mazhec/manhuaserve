//banner路由模块

var express = require('express')
var uploadDao = require('../models/uploadDao')//载入分类数据操作模块
var formidable = require('formidable'); //上传功能的插件
var path = require('path')
var fs = require("fs");
var router = express.Router()


//处理所有分类请求
router.post('/upload/img',(req,res)=>{
    // bannerDao.getBanner((data)=>{
    //     res.json(data)
    // })
    var userId = req.user.id;
    console.log('后台接收到请求')
    var form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, '../uploads/'); //文件保存的临时目录为static文件夹（文件夹不存在会报错，一会接受的file中的path就是这个）
    form.keepExtensions = true; //使用文件的原扩展名
    form.parse(req, (err, fields, file) => {
        var filePath = '';
        //如果提交文件的form中将上传文件的input名设置为tmpFile，就从tmpFile中取上传文件。否则取for in循环第一个上传的文件。  
        if (file.tmpFile) {
          filePath = file.tmpFile.path;
          
        } else {
          for (var key in file) {
            if (file[key].path && filePath === '') {
              filePath = file[key].path;
              break;
            }
          }
        }
        console.log('文件路径：'+filePath)
        //文件移动的目录文件夹，不存在时创建目标文件夹  
        var targetDir = path.join(__dirname, '../uploads/headImg');
        if (!fs.existsSync(targetDir)) {
          fs.mkdir(targetDir);
        }
        var fileExt = filePath.substring(filePath.lastIndexOf('.'));
        //判断文件类型是否允许上传  
        if (('.jpg.jpeg.png.gif').indexOf(fileExt.toLowerCase()) === -1) {
          var err = new Error('此文件类型不允许上传');
          res.json({
            code: -1,
            message: '此文件类型不允许上传'
          });
        } else {
          //以当前时间戳对上传文件进行重命名  
          var fileName = new Date().getTime() + fileExt;
          var targetFile = path.join(targetDir, fileName);
          console.log('targetFile'+targetFile)
          //移动文件  
          fs.rename(filePath, targetFile, function (err) {
            if (err) {
              console.info(err);
              res.json({
                code: -1,
                message: '上传失败'
              });
              console.log('上传失败')
            } 
            else {
              console.log('上传成功！！！')
              console.log('用户ID：'+userId)
              console.log('重命名后的文件名：'+fileName)
              uploadDao.updateHeadImg(userId, fileName, (data) => {
                res.json({
                  ok:true,
                  msg:'更换头像成功'
                })
              })
            }
          });
        }
      });
})

module.exports = router;