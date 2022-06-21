const mongoose = require('mongoose');
const reservationSchema = mongoose.Schema({
    state:{
        //1 payé
        //2 avec acompte 
        //3 pas payé
        //4 : annulé
        type: Number , 
        default : 3

    } ,
    payed : {
        type : Number ,
        require : true
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
        type : mongoose.Schema.Types.ObjectId , 
        ref : 'reservation'
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
    } ,
    reference : {
        type : String ,
        require : true
    } ,
    typeTransfert : {
        type : String, 
        require : true
    }
   
})

const ReservationModel = new mongoose.model("reservation",reservationSchema);
module.exports = {ReservationModel}