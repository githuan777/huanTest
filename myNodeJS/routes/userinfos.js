var express = require('express')
var jwt = require('../utils/jwt')
var Userinfos = require('../db/model/userinfos')

var router = express.Router();

//注册
router.post('/register', (req, res) => {
    const { username, password} = req.body

    Userinfos.find({
            username
    })
        .then((data) => {
            if (data.length == 0) { //没有就新增
                return Userinfos.insertMany({
                    username,
                    password,
                    // usertel
                })
            } else {
                res.send({
                    code: -1,
                    msg: '该用户名或手机号已注册'
                })
            }
        })
        .then((data) => {
            if (data) {// 针对上一个then，如果没有返回值就不执行，有的话就执行
                res.send({
                    code: 1,
                    msg: '用户注册成功',
                    list: data
                })
            }
        })
        .catch((err) => {
            console.log(err)
            res.send({
                code: -1,
                msg: '用户注册失败'
            })
        })

})


/**
 * @api {post} /userinfos/login 登录接口
 * @apiName UserLogin
 * @apiGroup User
 *
 * @apiParam {String} username 用户名
 * @apiParam {String} password 密码
 *
 * @apiSuccess {Number} code 状态码.
 * @apiSuccess {String} msg  提示信息.
 */




//登录接口
router.post('/login', (req, res) => {
    const { username, password } = req.body

    Userinfos.find({
        username,
        password
    })
    .then((data) => {
        if (data.length) {

            const token = jwt.createToken({ username })
            res.send({
                code: 1,
                msg: '登录成功',
                token
            })
        } else {
            res.send({
                code: -1,
                msg: '登录失败'
            })
        }
    })
    .catch(() => {
        res.send({
            code: -1,
            msg: '内部错误'
        })
    })
})



//用户信息
router.post('/info',(req,res)=>{
    const {token}=req.body
    
    jwt.checkToken(token)
    .catch((err) => {
        console.log(err)
        res.send({
            code: -2,
            msg: '用户未登录'
        })
    })
    .then((data)=>{
        const{username}=data

        return Userinfos.find({
            username
        })
        
    })
    .then((data)=>{
        const info = data[0]
        res.send({
            code:1,
            msg:'获取用户信息成功',
            info
        })
    })
    .catch((err)=>{
        console.log(err)
        res.send({
            code:-1,
            msg:'获取用户信息失败'
        })

    })
})



module.exports = router;




