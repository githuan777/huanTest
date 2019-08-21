const mongoose = require('mongoose')

const datebaogoodsSchema = new mongoose.Schema({
   
    id : Number,
    local_product_name : String,
    display_price : String,
    product_sales_volume :Number,
    current_price :String,
    original_price :String,
    reward_ratio :String,
    company_short_name :String,
    list_img_url_app :String,
    list_subtitle :String,
    is_list_show :String,
    is_list_recommend :String,
    is_list_new :String,
    is_list_hot :String,
    recommend :Number,
    display_price_float :Number,
    display_price_str :String,
    tag :Array,
    productCategoryArr :Array,
    features :String,
    coupon :Array,
    tag_name :String ,
    url :String,
    imgList :Array
})

const Datebaogoods = mongoose.model('datebaogoods',datebaogoodsSchema)

module.exports=Datebaogoods

