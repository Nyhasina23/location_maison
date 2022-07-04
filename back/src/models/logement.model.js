const mongoose = require('mongoose')

const LogementSchema = mongoose.Schema({
    name: {
        type: String,
    },
    type: {
        type: String,
    },
    disponibility: {
        type: Array,
    },
    address: {
        type: String,
    },
    description: {
        type: Array,
    },
    surface: {
        type: String,
    },
    modalite: {
        // a = parking
        // b = cuisine 
        // c = douche
        // d = eau chaude
        // e = wifi
        // f = tele satellite
        // g = salle de jeu
        // h = gardien

        type: String
    },
    chambre: {
        type: Number
    },
    pers_max: {
        type: Number
    },
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'image'
    }],
    reservation: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'reservation'
    }],
    price: {
        type: Array,
    },
})

const LogementModel = mongoose.model('logements', LogementSchema)

module.exports = { LogementModel }
