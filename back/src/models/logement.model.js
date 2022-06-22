const mongoose = require('mongoose')

const LogementSchema = mongoose.Schema({
    name : {
        type : String , 
    } ,
    type : {
        type : String , 
    },
    disponibility : {
        type : Array , 
    },
    address : {
        type : String ,
    } ,
    description : {
        type : String ,
    } ,
    surface : {
        type : Number ,
    } ,
    modalite : {
        // a = parking
        // b = cuisine 
        // c = douche
        // d = eau chaude
        // e = wifi
        // f = tele satellite
        // g = salle de jeu
        // h = gardie

        type : String
    } ,
    images : [{
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'image'
    }], 
    reservation :[ {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'reservation'
    }] ,
    price : {
        type : Array , 
    } , 
})

const LogementModel = mongoose.model( 'logements' , LogementSchema)

module.exports = {LogementModel}
