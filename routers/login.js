//用户的登录和注册的路由

//banner路由模块

var express = require('express')
const jwt = require('jsonwebtoken')
const crypto = require('crypto');
const userDao = require('../models/userDao')
const moment = require('moment')
const config = require('../conf/config')

var router = express.Router()


//处理所有分类请求
router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username == null || username == '' || password == null || password == '') {
        res.json({
            ok: false,
            msg: '请填写完整信息'
        })
        return;
    }
    userDao.login(username, crypto.createHmac('sha256', password).digest('hex'), (data) => {
        if (data.length > 0) {
            var user = {
                id: data[0].id,
                username: data[0].username,
                resgisterTime: data[0].register_time,
                userSrc: data[0].head_img
            }

            console.log(user)
            const token = 'bearer ' + jwt.sign(user, config.jwt_secret, { expiresIn: config.jwt_expires_time }
            )
            res.json({
                ok: true,
                token: token,
                user: user
            })
        } else {
            res.json({
                ok: false,
                msg: '用户名或密码错误'
            })
        }
    })
    // const token = 'bearer ' + jwt.sign(
    //     {
    //         _id: '123456789',
    //         admin: true
    //     },
    //     'secret12345',
    //     {
    //         expiresIn: 3600 * 24 * 3
    //     }
    // )
    // res.json({
    //     status: 'ok',
    //     data: { token: token }
    // })
})

router.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;
    const mobile = req.body.mobile;

    if (username == null || username == '' || password == null || password == '' || password2 == null || password2 == '' || mobile == null || mobile == '') {
        res.json({
            ok: false,
            msg: '请填写完整信息'
        })
        return;
    }
    userDao.isExist(username, (data) => {
        if (data.length > 0) {
            res.json({
                ok: false,
                msg: '用户已存在'
            })
        } else {
            if (password != password2) {
                res.json({
                    ok: false,
                    msg: '两次密码不一致'
                })
                return;
            }
            if (!(/^1[3456789]\d{9}$/.test(mobile))) {
                res.json({
                    ok: false,
                    msg: '请填写正确的手机号'
                })
                return;
            }
            var user = {
                username: username,
                password: crypto.createHmac('sha256', password).digest('hex'),
                mobile: mobile,
                resgisterTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
            }
            userDao.registerUser(user, (data) => {
                if (data.affectedRows > 0) {
                    res.json({ ok: true })
                } else {
                    res.json({
                        ok: false,
                        msg: '系统错误'
                    })
                }
            })
        }
    })
})

module.exports = router;