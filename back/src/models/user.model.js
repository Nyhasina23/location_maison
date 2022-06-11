const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username : {
        type : String , 
        require : true
    } , 
    email : {
        type : String , 
        require : true
    } , 
    password : {
        type : String  , 
        require : true
    }
});

const UserModel = new mongoose.model('site-location' , UserSchema , 'users')

module.exports =  {UserModel}