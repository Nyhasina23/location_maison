const express =  require('express');
const router = express.Router();

const {reservationController} = require('../controllers/reservation.controller.js')

router.post('/' , reservationController.reserver)
router.get('/user' , reservationController.getAllReservationUser)
router.get('/' , reservationController.getAllReservation)
router.put('/validate/:idRes' , reservationController.validReservation)

module.exports = router