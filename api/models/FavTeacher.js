const mongoose = require('mongoose')
const { Schema } = mongoose;
const FavTeacherUserSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'studentUser'
    },
    name: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('favTeacher', FavTeacherUserSchema)