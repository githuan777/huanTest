var express = require('express');
var Datebaogoods=require('../db/model/datebaogoods')

var router = express.Router();

//新增商品
router.post('/add',(req,res)=>{
    const {goodsName,goodsImg,goodsPrice,goodsNum,goodsTitle,goodsDesc} = req.body

    Datebaogoods.insertMany({
        goodsName,
        goodsImg,
        goodsPrice,
        goodsNum,
        goodsTitle,
        goodsDesc
    }).then(()=>{
        res.send({
            code:1,
            msg:'新增商品成功'
        })
    }).catch(()=>{
        res.send({
            code:-1,
            msg:'新增商品失败'
        })
    })
})


//模糊查询商品
router.post('/search',(req,res)=>{
    const {keyword} = req.body

    const regExp = new RegExp(keyword,'ig')

    Datebaogoods.find({
        $or:[
            {
                local_product_name:{$regex:regExp}
            },
            {
                list_subtitle:{$regex:regExp}
            }
        ]
    })
    .then((data)=>{
        res.send({
            code:1,
            msg:'查询商品成功',
            list:data
        })
    }).catch(()=>{
        res.send({
            code:-1,
            msg:'查询商品失败'
        })
    })
})


//商品分页
router.post('/list',(req,res)=>{
    let {pageNum,pageSize} = req.body

    pageNum = pageNum*1 || 1
    pageSize = pageSize*1 || 10

    Datebaogoods.find({})
    .skip((pageNum-1)*pageSize)
    .limit(pageSize)
    .then((data)=>{
        res.send({
            code:1,
            msg:'商品分页成功',
            list:data
        })
    }).catch(()=>{
        res.send({
            code:-1,
            msg:'商品分页失败'
        })
    })
})


//商品排序
router.post('/sort',(req,res)=>{
    const {rank,order} = req.body

    Datebaogoods.find({})
    .sort({
        [rank]:order   //规定升序为1，降序为-1
    })
    .then((data)=>{
        res.send({
            code:1,
            msg:'商品排序成功',
            list:data
        })
    }).catch(()=>{
        res.send({
            code:-1,
            msg:'商品排序失败'
        })
    })
})


//划分价格
router.post('/price',(req,res)=>{
    const {start,end} = req.body

    Datebaogoods.find({
        $and:[
            {
                display_price_float:{$gte:start}
            },
            {
                display_price_float:{$lte:end}
            }
        ]
    })
    .then((data)=>{
        res.send({
            code:1,
            msg:'商品划分价格成功',
            list:data
        })
    }).catch(()=>{
        res.send({
            code:-1,
            msg:'商品划分价格失败'
        })
    })
})

//商品详情
router.post('/detail',(req,res)=>{
    const {goodsId} = req.body
    
    Datebaogoods.find({
        id:goodsId
    })
    .then((data)=>{
        res.send({
            code:1,
            msg:'获取商品详情成功',
            list:data[0]
        })
    }).catch((err)=>{
        console.log(err)
        res.send({
            code:-1,
            msg:'获取商品详情失败'
        })
    })
})


// 商品分类
router.post('/type',(req,res) => {
    const {type} = req.body

    Datebaogoods.find({
        is_list_show: type
    })
    .then((data) => {
        res.send({
            code: 1,
            msg: '商品分类成功',
            list: data
        })
    })
    .catch((err) => {
        console.log(err)
        res.send({
            code: -1,
            msg: '商品分类失败'
        })
    })
})


//轮播 
router.post('/swiper',(req,res)=>{
    Datebaogoods.find().sort({
        goodsNum:-1
    })
    .limit(3)
    .then((data)=>{
        res.send({
            code:1,
            msg:"轮播图获取成功",
            list:data
        })
    })
    .catch((err)=>{
        console.log(err)
        res.send({
            code:-1,
            msg:"轮播图获取失败"
        })
        
    })
})


// 商品列表接口,包含模糊查询和分页
router.post('/list2',(req,res)=>{
    let {keyword,goodsType,rank,order,start,end,pageNum,pageSize} = req.body
    if(keyword=='不想查~~不想查!!'){
        keyword=''
    }
    pageNum = pageNum*1 || 1
    pageSize = pageSize*1 || 10

    const regExp = new RegExp(keyword,'ig')

    Datebaogoods.find({
        $or:[
            {
                company_short_name:{$regex:regExp}
            },
            {
                local_product_name:{$regex:regExp}
            },
            {
                list_subtitle:{$regex:regExp}
            },
            {
                features:{$regex:regExp}
            },
        ]
    })
    .find(
        // goodsType === '' ? {} : {goodsType:goodsType*1}
        !goodsType? {} : {is_list_show:goodsType*1}
    )
    .sort(
        !rank?{}:{[rank]:order}// 升序就是1，降序就是-1
    )
    .find({
        $and:[
            
                // goodsPrice: {$gte: start*1}
            !start ? {} : {display_price_float: {$gte: start-0}}
        
            ,
                // goodsPrice: {$lte: end*1}
            !end ? {} : {display_price_float: {$lte: end-0}}
        
        ]
    })
    .skip((pageNum-1)*pageSize) // 先跳过前面pageNum-1页数据
    .limit(pageSize) // 再取剩下这一页上的数据
    .then((data)=>{
        res.send({
            code:1,
            msg:'查询商品成功',
            list:data
        })
    }).catch((err)=>{
        console.log(err)
        res.send({
            code:-1,
            msg:'查询商品失败'
        })
    })
})

module.exports = router;