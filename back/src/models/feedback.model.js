const mongoose = require('mongoose')

const FeedbackSchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'users'
    },
    content:{
        type:String,
    },
    note : {
        type : Number,
        default : 0
    }
  
});

const FeedbackModel = new mongoose.model('feedback', FeedbackSchema)

module.exports = { FeedbackModel }