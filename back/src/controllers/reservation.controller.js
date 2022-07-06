const { ReservationModel } = require("../models/reservation.model");
const { UserModel } = require('../models/user.model')
const jwtdecode = require('jwt-decode')
const { sendMail } = require('../modules/emailSend')
const { LogementModel } = require('../models/logement.model')
const {sha} = require('../modules/sha256')
class reservationController {
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
            const logement = req.body.logement;
            const nb_pers = req.body.nbr_pers;
            const date_enter = req.body.date_enter;
            const date_leave = req.body.date_leave;
            const transport = req.body.transport;
            const hour_enter = req.body.hour_enter;
            const hour_leave = req.body.hour_leave;
            const reference = req.body.reference;
            const typeTransfert = req.body.typeTransfert;
            const payed = req.body.payed;
            const toPay = req.body.toPay;
            if(nb_pers == '' || date_enter == '' || 
             date_leave == '' || transport == '' || hour_enter == ''
             || hour_leave == '' || reference == '' || typeTransfert == ''){
                res.status(403).send()
            }else{
                const newReservation = new ReservationModel({
                    firstname,
                    lastname,
                    logement,
                    address,
                    contact,
                    email,
                    nbr_pers : nb_pers,
                    date_enter,
                    date_leave,
                    transport,
                    hour_enter,
                    hour_leave,
                    reference,
                    typeTransfert,
                    payed,
                    toPay
                })
    
    
                newReservation.save(async () => {
                    console.log(logement);
                    const _logement = await LogementModel.findById(logement)
                    _logement.reservation.push(newReservation._id)
                    _logement.save()
                    user.reservation.push(newReservation._id)
                    user.save()
    
                })
                const text = 'reference : ' + reference + ' type Transfert : ' + typeTransfert 
                let isSent = await sendMail(process.env.ADMIN_EMAIL, 'Payment reservation', text)
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
            const user = await UserModel.findById(userId).populate('reservation')
            console.log(user);
            res.send(user.reservation)
        } catch (error) {
            res.status(500).send('Eroor while getting user reservations')
        }
    }
    static getOneReservationUSer = async (req, res) => {
        try {
            const idRes = req.params.idRes;
            const reservation = await ReservationModel.findById(idRes.toString());
            res.status(200).send(reservation)
        } catch (error) {
            res.status(500).send('Eroor while getting one reservation')
        }

    }

    static getReservationAcompte = async (req , res) => {
        try {
            const reservation = await ReservationModel.find({state : 2})
            res.status(200).send(reservation)
        } catch (error) {
            res.status(500).send()
        }
    }

    static getReservationPayed = async (req , res) => {
        try {
            const reservation = await ReservationModel.find({state : 1})
            res.status(200).send(reservation)
        } catch (error) {
            res.status(500).send()
        }
    }

    static getReservationNotPayed = async (req , res) => {
        try {
            const reservation = await ReservationModel.find({state : 3})
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
            let reservation = await ReservationModel.findById(reservationId);
            let logement = await LogementModel.findById(reservation.logement);
            
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
                logement.disponibility.push({
                    start: reservation.date_enter,
                    end: reservation.date_leave,
                    color,
                    reservation: reservation._id.toString()
                })
                reservation.isSeen = false
            } else {

                console.log(logement.disponibility);
                for (let i = 0; i < logement.disponibility.length; i++) {
                    if (logement.disponibility[i].reservation == reservation._id.toString()) {
                        logement.disponibility.splice(i, 1);
                        await logement.save();
                    }
                }
                logement.disponibility.push({
                    start: reservation.date_enter,
                    end: reservation.date_leave,
                    color,
                    reservation: reservation._id.toString()
                })
                await logement.save();
                
            }


            let text = "Votre payement a été pris en compte";
            sendMail(reservation.email, 'Payment reservation', text);
            logement.save((err, docs) => {
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

    static getAllReservationLogement = async (req, res) => {
        try {
            const idLog = req.params.idLog;
            const reservationLog = await LogementModel.findById(idLog).populate('reservation')
            res.status(200).send(reservationLog)
        } catch (error) {
            res.status(500).send('Eroor while getting  reservations logement')

        }

    }

    static getAllReservation = async (req, res) => {
        try {
            const allRes = await ReservationModel.find().sort({ date: -1 })
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
            console.log(password  ,' === ' , userPassword);
            if(password === userPassword){
                const reservationId = req.body.reservationId;
                const reservation = await ReservationModel.findById(reservationId);
                const logement = await LogementModel.findById(reservation.logement);
                for (let i = 0; i < logement.disponibility.length; i++) {
                    if (logement.disponibility[i].reservation == reservationId) {
                        logement.disponibility.splice(i, 1);
                        logement.save();
                        break;
                    }
                }
                reservation.state = 4;
                reservation.save();
                let text = "L'annulation de votre réservation a bien été pris en compte";
                sendMail(reservation.email, 'Annulation de reservation', text);
                text = 'La reservation de ' + reservation.firstname + " " + reservation.lastname + " sur la résidence " + logement.name + " a été annulée";
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
        const reservationId = req.body.reservationId;
        const reservation = await ReservationModel.findById(reservationId);
        const logement = await LogementModel.findById(reservation.logement);
        console.log(logement.disponibility);
        for (let i = 0; i < logement.disponibility.length; i++) {
            if (logement.disponibility[i].reservation == reservationId) {
                logement.disponibility.splice(i, 1);
                logement.save();
                break;
            }
        }
        reservation.state = 4;
        reservation.save();
        let text = "Votre réservation sur la résidence " + logement.name + " a été annulée";
        sendMail(reservation.email, 'Annulation de reservation', text);
        text = "L'annulation de la réseravtion de" + reservation.firstname + " " + reservation.lastname + " sur la résidence " + logement.name + " a bien été pris en compte";
        sendMail(process.env.ADMIN_EMAIL, 'Annulation de reservation', text);
        res.status(200).send("annulé")
    }
}
module.exports = { reservationController };