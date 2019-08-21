const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/19999',{ useNewUrlParser: true })

const db = mongoose.connection

db.once('open',()=>{
    console.log('db ok')
})

db.on('error',()=>{
    console.log('db error')
})