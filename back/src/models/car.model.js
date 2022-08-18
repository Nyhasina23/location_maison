const mongoose = require('mongoose')

const CarSchema = mongoose.Schema({
    type : {
        type : String,
        required : false
    },
    marque : {
        type : String,
        required: false
    } , 
    description : {
        type : String,
        required: false
    },
    disponibility: {
        type: Array,
    },
    nbr_place : {
        type : Number ,
        required: false
    } ,
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'image'
    }],
    reservation: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carReservation'
    }],
    price: {
        type: Number,
    }
})

const CarModel = mongoose.model('car', CarSchema)

module.exports = { CarModel }
