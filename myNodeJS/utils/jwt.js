const jwt = require('jsonwebtoken')
const secret = 'qwertyuiop'    //定义一个密钥


// const obj ={
//     username : 'xiaobu',
//     password : '123456'
// }


// const token = jwt.sign(obj,secret)
// console.log(token)


// jwt.verify(token,secret,(err,data)=>{
//     if(!err){
//         console.log(data)
//     }else{
//         console.log("token校验失败")
//     }
// })

module.exports= {
    createToken(obj){
        return jwt.sign(obj,secret)
    },
    checkToken(token){
        return new Promise((resolve,reject)=>{
            jwt.verify(token,secret,(err,data)=>{
                if(!err){
                    resolve(data)
                }else{
                    reject("token校验失败")
                }
            })
        })
    }
}




