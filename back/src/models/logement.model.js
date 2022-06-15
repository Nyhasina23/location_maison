const mongoose = require('mongoose')

const LogementSchema = mongoose.Schema({
    name : {
        type : String , 
        require : true 
    } , 
    free_logement : {
        type : Array , 
        require : true
    } ,
    image : [{
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'image'
    }], 

    free_date : {
        type : Array , 
        require : true
    } ,

    price : {
        type : Number , 
        require : true
    } , 
})

const LogementModel = mongoose.model( 'logements' , LogementSchema)

module.exports = LogementModel
