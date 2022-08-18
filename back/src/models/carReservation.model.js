const mongoose = require('mongoose');
const carReservationSchema = mongoose.Schema({
    state:{
        //1 payé
        //2 avec acompte 
        //3 pas payé
        //4 : annulé
        type: Number , 
        default : 3

    },
    isSeen : {
        type : Boolean,
        default : true
    },
    payed : {
        type : Number ,
        default:0,
        require : true
    },
    toPay : {
        type: Number,
    },
    firstname : {
        type : String ,
        require : true
    } , 
    lastname : {
        type : String ,
        require : true
    } , 
    car : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : 'car'
    },
    date_enter : {
        type : String , 
        require : true        
    },
    date_leave : {
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
    reference : {
        type : String ,
        require : true
    } ,
    typeTransfert : {
        type : String, 
        require : true
    }, 
    date : {
        type : Date,
        default : Date.now()
    }
   
})

const CarReservationModel = new mongoose.model("carReservation",carReservationSchema);
module.exports = {CarReservationModel}