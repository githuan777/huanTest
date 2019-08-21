const mongoose = require('mongoose')

const userinfosSchema = new mongoose.Schema({
    username:{type:String},
    password:{type:String},
    usertel:{type:Number}
})

const Userinfos = mongoose.model('userinfos',userinfosSchema)

module.exports=Userinfos

