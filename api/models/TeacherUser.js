const mongoose = require('mongoose')
const { Schema } = mongoose;
const TeacherUserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
});
const TUser = mongoose.model('teacherUser', TeacherUserSchema);
module.exports = TUser;