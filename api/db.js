const mongoose = require('mongoose')
// const mongoURL = "mongodb+srv://divansh:App12345$@cluster0.ehzqzlk.mongodb.net/learningapp?retryWrites=true&w=majority"
const mongoURL= "mongodb://localhost:27017/learningapp"
const connectToMongo=()=>{
    mongoose.connect(mongoURL,{useNewUrlParser:true},()=>{
        console.log('Connection is done')
    })
}
module.exports=connectToMongo