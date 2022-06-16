const express =  require('express');
const router = express.Router();

const {reservationController} = require('../controllers/reservation.controller.js')

router.post('/' , reservationController.reserver)

module.exports = router