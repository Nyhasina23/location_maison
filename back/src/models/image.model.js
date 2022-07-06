const mongoose = require('mongoose');
const imageSchema = mongoose.Schema({
    url:{
        type:String,
        require: true
    },
    blur:{
        type:String
    }
})

const ImageModel = new mongoose.model("image",imageSchema);
module.exports = {ImageModel}