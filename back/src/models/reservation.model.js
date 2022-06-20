const mongoose = require('mongoose');
const reservationSchema = mongoose.Schema({
    state:{
        //1 payé
        //2 avec acompte 
        //3 pas payé
        type: Number , 
        default : 3

    } ,
    firstname : {
        type : String ,
        require : true
    } , 
    lastname : {
        type : String ,
        require : true
    } , 
    logement : {
        type : String , 
        require : true
    },
    address : {
        type : String ,
        require : true
    } , 
    contact : {
        type : String ,
        require : true
    } , 
    email : {
        type : String ,
        require : true
    } , 
    nbr_pers : {
        type : Number , 
        require : true
    } , 
    date_enter : {
        type : String , 
        require : true        
    },
    date_leave : {
        type : String , 
        require : true        
    },
    transport : {
        type : String , 
        require : true
    } ,
    hour_enter : {
        type : String,
        require : true
    } ,
    hour_leave : {
        type : String,
        require : true
    } 
})

const ReservationModel = new mongoose.model("reservation",reservationSchema);
module.exports = {ReservationModel}