const mongoose = require('mongoose');
const reservationSchema = mongoose.Schema({
    state:{
        type: Number
    }
})

const ReservationModel = new mongoose.model("reservation",reservationSchema);
module.exports = {ReservationModel}