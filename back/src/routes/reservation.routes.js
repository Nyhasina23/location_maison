const express =  require('express');
const router = express.Router();

const {reservationController} = require('../controllers/reservation.controller.js')

router.post('/' , reservationController.reserver)
router.get('/user' , reservationController.getAllReservationUser)
router.get('/' , reservationController.getAllReservation)
router.put('/validate/' , reservationController.validateReservation)
router.put('/userAnnulation/' , reservationController.userAnnulation)
router.put('/adminAnnulation/' , reservationController.adminAnnulation)
router.get('/logement/:idLog' , reservationController.getAllReservationLogement)

module.exports = router