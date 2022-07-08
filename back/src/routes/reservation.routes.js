const express =  require('express');
const router = express.Router();

const {reservationController} = require('../controllers/reservation.controller.js')

router.post('/' , reservationController.reserver)
router.get('/user' , reservationController.getAllReservationUser)
router.get('/' , reservationController.getAllReservation)
router.get('/payed' , reservationController.getReservationPayed)
router.get('/notPayed' , reservationController.getReservationNotPayed)
router.get('/acompte' , reservationController.getReservationAcompte)
router.get('/cancel' , reservationController.getReservationCanceled)
router.get('/oneReservation/:idRes' , reservationController.getOneReservationUSer)
router.put('/validate/' , reservationController.validateReservation)
router.put('/userAnnulation/' , reservationController.userAnnulation)
router.put('/adminAnnulation/' , reservationController.adminAnnulation)
router.get('/logement/:idLog' , reservationController.getAllReservationLogement)

module.exports = router