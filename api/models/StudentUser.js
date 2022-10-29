const mongoose = require('mongoose')
const { Schema } = mongoose;
const StudentUserSchema = new  Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
});
const SUser = mongoose.model('studentUser',StudentUserSchema);
module.exports=SUser;