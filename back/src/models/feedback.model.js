const mongoose = require('mongoose')

const FeedbackSchema = mongoose.Schema({
    author: {
        type: String,
    },
    content:{
        type:String,
    },
    note : {
        type : Number,
        default : 0
    },
    date : {
        type : Date,
        default : Date.now()
    }
  
});

const FeedbackModel = new mongoose.model('feedback', FeedbackSchema)

module.exports = { FeedbackModel }