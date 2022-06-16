const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username : {
        type : String , 
    },
    role:{
        type : Number,
        default: 0
    },
    fullname:{
        type: String,
    },
    email : {
        type : String , 
        require : true
    } , 
    password : {
        type : String  , 
        require : true
    },
    isMale : {
        type: Boolean,
        default: true
    },
    recoveryCode :{
        type : String
    }
});

const UserModel = new mongoose.model('site-location' , UserSchema , 'users')

module.exports =  {UserModel}