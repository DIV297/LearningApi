const mongoose = require('mongoose')
const mongoURL= "mongodb://localhost:27017/learningapp"
const connectToMongo=()=>{
    mongoose.connect(mongoURL,{useNewUrlParser:true},()=>{
        console.log('Connection is done')
    })
}
module.exports=connectToMongo
