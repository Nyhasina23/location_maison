const express =  require('express');
const router = express.Router();

const {carReservationController} = require('../controllers/carReservation.controller.js')

router.post('/' , carReservationController.reserver)
router.get('/user' , carReservationController.getAllReservationUser)
router.get('/' , carReservationController.getAllReservation)
router.get('/payed' , carReservationController.getReservationPayed)
router.get('/notPayed' , carReservationController.getReservationNotPayed)
router.get('/acompte' , carReservationController.getReservationAcompte)
router.get('/oneReservation/:idRes' , carReservationController.getOneReservationUSer)
router.put('/validate/' , carReservationController.validateReservation)
router.put('/userAnnulation/' , carReservationController.userAnnulation)
router.put('/adminAnnulation/' , carReservationController.adminAnnulation)
router.get('/all/:idCar' , carReservationController.getAllReservationCar)

module.exports = router