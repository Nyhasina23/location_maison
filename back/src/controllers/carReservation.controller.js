const { CarReservationModel } = require("../models/carReservation.model");
const {CarModel} = require('../models/car.model')
const { UserModel } = require('../models/user.model')
const jwtdecode = require('jwt-decode')
const { sendMail } = require('../modules/emailSend')
const { LogementModel } = require('../models/logement.model')
const {sha} = require('../modules/sha256')
class carReservationController {
    static reserver = async (req, res) => {
        try {
            const token = req.headers['authorization'].split(' ')[1];
            const userId = jwtdecode(token).id;
            const user = await UserModel.findById(userId)
            const firstname = user.firstname;
            const lastname = user.lastname;
            const address = user.address;
            const contact = user.phoneNumber;
            const email = user.email;
            const car = req.body.car;
            const date_enter = req.body.date_enter;
            const date_leave = req.body.date_leave;
            const nbr_pers = req.body.nbr_pers;
            const reference = req.body.reference;
            const typeTransfert = req.body.typeTransfert;
            const payed = req.body.payed;
            const toPay = req.body.toPay;
            if( car == '' || nbr_pers == '' || date_enter == '' || 
             date_leave == '' ||  reference == '' || typeTransfert == '' || payed == '' || toPay == ''){
                res.status(403).send()
            }else{
                const newCarReservation = new CarReservationModel({
                    firstname,
                    lastname,
                    car,
                    date_enter,
                    date_leave,
                    address,
                    contact,
                    email,
                    nbr_pers,
                    reference,
                    typeTransfert,
                    payed,
                    toPay
                })
    
    
                newCarReservation.save(async () => {
                    const _car = await CarModel.findById(car)
                    _car.reservation.push(newCarReservation._id)
                    _car.save()
                    user.carReservation.push(newCarReservation._id)
                    user.save()
    
                })
                const text = 'reference : ' + reference + ' type Transfert : ' + typeTransfert 
                let isSent =  sendMail(process.env.ADMIN_EMAIL, 'Payment reservation', text)
                console.log(isSent)
                if (isSent) {
                    res.status(200).send(true)
                } else {
                    res.status(200).send(false)
                }
            }


        } catch (error) {
            console.log(error);
            res.status(500).send('error while make reservation')
        }

    }

    static getAllReservationUser = async (req, res) => {
        try {
            const token = req.headers['authorization'].split(' ')[1];
            const userId = jwtdecode(token).id;
            const user = await UserModel.findById(userId).populate('carReservation')
            res.send(user.carReservation)
        } catch (error) {
            res.status(500).send('Eroor while getting user reservations')
        }
    }
    static getOneReservationUSer = async (req, res) => {
        try {
            const idRes = req.params.idRes;
            const reservation = await CarReservationModel.findById(idRes.toString());
            res.status(200).send(reservation)
        } catch (error) {
            res.status(500).send('Eroor while getting one reservation')
        }

    }

    static getReservationAcompte = async (req , res) => {
        try {
            const reservation = await CarReservationModel.find({state : 2})
            res.status(200).send(reservation)
        } catch (error) {
            res.status(500).send()
        }
    }

    static getReservationPayed = async (req , res) => {
        try {
            const reservation = await CarReservationModel.find({state : 1})
            res.status(200).send(reservation)
        } catch (error) {
            res.status(500).send()
        }
    }

    static getReservationNotPayed = async (req , res) => {
        try {
            const reservation = await CarReservationModel.find({state : 3})
            res.status(200).send(reservation)
        } catch (error) {
            res.status(500).send()
        }
    }

    static validateReservation = async (req, res) => {
        try {
            const reservationId = req.body.reservation;
            const payed = parseInt(req.body.payed);
            let color;
            let reservation = await CarReservationModel.findById(reservationId);
            let car = await CarModel.findById(reservation.car);
            
            reservation.payed = reservation.payed + payed;
            if (reservation.payed < 0) {
                reservation.payed = 0
            }
            if (reservation.payed == 0) {
                reservation.state = 3;
                color = "red";
            } else if (reservation.payed < reservation.toPay) {
                reservation.state = 2;
                color = "blue";
            } else {
                reservation.state = 1;
                color = "green";
            }

            if (reservation.isSeen) {
                car.disponibility.push({
                    start: reservation.date_enter,
                    end: reservation.date_leave,
                    color,
                    reservation: reservation._id.toString()
                })
                reservation.isSeen = false
            } else {

                console.log(car.disponibility);
                for (let i = 0; i < car.disponibility.length; i++) {
                    if (car.disponibility[i].reservation == reservation._id.toString()) {
                        car.disponibility.splice(i, 1);
                        await car.save();
                    }
                }
                car.disponibility.push({
                    start: reservation.date_enter,
                    end: reservation.date_leave,
                    color,
                    reservation: reservation._id.toString()
                })
                await car.save();
                
            }


            let text = "Votre payement a été pris en compte";
            sendMail(reservation.email, 'Payment reservation', text);
            car.save((err, docs) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(docs);
                }
            });
            reservation.save();
            res.send(reservation);
        } catch (error) {
            res.status(500).send('Eroor while validating  reservations')
            console.log(error);
        }

    }

    static getAllReservationCar = async (req, res) => {
        try {
            const idCar = req.params.idCar;
            const reservationCar = await CarModel.findById(idCar).populate('reservation')
            res.status(200).send(reservationCar)
        } catch (error) {
            res.status(500).send('Eroor while getting  reservations logement')

        }

    }

    static getAllReservation = async (req, res) => {
        try {
            const allRes = await CarReservationModel.find().sort({ date: -1 })
            res.status(200).send(allRes)
        } catch (error) {
            console.log(error);
        }

    }


    static userAnnulation = async (req, res) => {
        try {
            const token = req.headers['authorization'].split(' ')[1];
            const userId = jwtdecode(token).id;
            const user = await UserModel.findById(userId);
            const userPassword = user.password
            const password = sha(req.body.password);
            console.log('annulation ')
            if(password === userPassword){
                const reservationId = req.body.reservationId;
                const reservation = await CarReservationModel.findById(reservationId);
                const car = await CarModel.findById(reservation.car);
                for (let i = 0; i < car.disponibility.length; i++) {
                    if (car.disponibility[i].reservation == reservationId) {
                        car.disponibility.splice(i, 1);
                        car.save();
                        break;
                    }
                }
                reservation.state = 4;
                reservation.save();
                let text = "L'annulation de votre réservation a bien été pris en compte";
                sendMail(reservation.email, 'Annulation de reservation', text);
                text = 'La reservation de ' + reservation.firstname + " " + reservation.lastname + " sur la résidence " + car.name + " a été annulée";
                sendMail(process.env.ADMIN_EMAIL, 'Annulation de reservation', text);
                res.status(200).send("annulé")
            }else{
                res.status(403).send()
            }
          
        } catch (error) {
            console.log(error);
            res.status(500).send()
        }
       
    }
    static adminAnnulation = async (req, res) => {

        try {
            const token = req.headers['authorization'].split(' ')[1];
            const userId = jwtdecode(token).id;
            const user = await UserModel.findById(userId);
            const userPassword = user.password
            const password = sha(req.body.password);
            if(password === userPassword){
                const reservationId = req.body.reservationId;
                const reservation = await CarReservationModel.findById(reservationId);
                const car = await CarModel.findById(reservation.car);
             
                for (let i = 0; i < car.disponibility.length; i++) {
                    if (car.disponibility[i].reservation == reservationId) {
                        car.disponibility.splice(i, 1);
                        car.save();
                        break;
                    }
                }
                reservation.state = 4;
                reservation.save();
                let text = "Votre réservation sur la résidence " + logement.name + " a été annulée";
                sendMail(reservation.email, 'Annulation de reservation', text);
                text = "L'annulation de la réseravtion de" + reservation.firstname + " " + reservation.lastname + " sur la résidence " + car.name + " a bien été pris en compte";
                sendMail(process.env.ADMIN_EMAIL, 'Annulation de reservation', text);
                res.status(200).send("annulé")
            }else{
                res.status(403).send()
            }

           
        } catch (error) {
            res.status(500).send()
        }


       
    }
}
module.exports = { carReservationController };