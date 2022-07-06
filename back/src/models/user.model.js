const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    role: {
        type: Number,
        default: 0
    },
    concat:{
        type:String,
    },
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    isMale: {
        type: Boolean,
        default: true
    },
    recoveryCode: {
        type: String
    },
    address: {
        type: String
    },
    phoneNumber: {
        type: String
    } , 
    reservation : [{
        type : mongoose.Schema.Types.ObjectId , 
        ref : 'reservation'
    }]
});

const UserModel = new mongoose.model('site-location', UserSchema, 'users')

module.exports = { UserModel }