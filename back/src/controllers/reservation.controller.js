const { ReservationModel } = require("../models/reservation.model");
const { UserModel } = require('../models/user.model')
const jwtdecode = require('jwt-decode')
const { sendMail } = require('../modules/emailSend')
const { LogementModel } = require('../models/logement.model')
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
            const nb_pers = req.body.nb_pers;
            const date_enter = req.body.date_enter;
            const date_leave = req.body.date_leave;
            const transport = req.body.transport;
            const hour_enter = req.body.hour_enter;
            const hour_leave = req.body.hour_leave;
            const reference = req.body.reference;
            const typeTransfert = req.body.typeTransfert;
            const payed = req.body.payed;

            const newReservation = new ReservationModel({
                firstname,
                lastname,
                logement,
                address,
                contact,
                email,
                nb_pers,
                date_enter,
                date_leave,
                transport,
                hour_enter,
                hour_leave,
                reference,
                typeTransfert,
                payed
            })


            newReservation.save(async () => {
                console.log(logement);
                const _logement = await LogementModel.findById(logement)
                _logement.reservation.push(newReservation._id)
                _logement.save()
                user.reservation.push(newReservation._id)
                user.save()

            })
            const text = 'reference : ' + reference + ' type Transfert : ' + typeTransfert + ' Valeur : ' + payed
            sendMail(process.env.ADMIN_EMAIL, 'Payment reservation', text)

            res.status(200).send('created')

        } catch (error) {
            res.status(500).send('error while make reservation')
        }

    }

    static getAllReservationUser = async (req, res) => {
        try {
            const token = req.headers['authorization'].split(' ')[1];
            const userId = jwtdecode(token).id;
            const user = await UserModel.findById(userId).populate('reservation')
            res.send(user.reservation)
        } catch (error) {
            res.status(500).send('Eroor while getting user reservations')
        }
    }
    static getOneReservationUSer = async (req , res) => {
        try {
            const idRes = req.params.idRes;
            const reservation = await ReservationModel.findById(idRes)
            res.status(200).send(reservation)
        } catch (error) {
            res.status(500).send('Eroor while getting one reservation')
        }

    }
    static validateReservation = async (req, res) => {
        try {
            const reservationId = req.body.reservation;
            const payed = req.body.payed;
            let state = req.body.state;
            let color;
            let reservation = await ReservationModel.findById(reservationId);
            let logement = await LogementModel.findById(reservation.logement);
            reservation.payed = reservation.payed + payed;
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
            logement.disponibility.push({
                start: reservation.date_enter,
                end: reservation.date_leave,
                color: 'red',
                reservation : reservation._id.toString()
            })
            let text = "Votre payement a été pris en compte";
            sendMail(reservation.email, 'Payment reservation', text);
            logement.save();
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
            await ReservationModel.find((error, docs) => {
                if (error) {
                    res.status(500).send('error while geting all reservation');
                } else {
                    res.send(docs);
                }
            })
        } catch (error) {
            console.log(error);
        }
       
    }

    

    static userAnnulation = async (req, res) =>{
        const reservationId = req.body.reservationId;
        const reservation = await ReservationModel.findById(reservationId);
        const logement = await LogementModel.findById(reservation.logement);
        console.log(logement.disponibility);
        for(let i = 0; i<logement.disponibility.length; i++){
            if(logement.disponibility[i].reservation == reservationId){
                logement.disponibility.splice(i,1);
                logement.save();
                break;
            }
        }
        reservation.state = 4;
        reservation.save();
        let text = "L'annulation de votre réservation a bien été pris en compte";
        sendMail(reservation.email, 'Annulation de reservation', text);
        text = 'La reservation de '+reservation.firstname+" "+reservation.lastname+" sur la résidence "+logement.name+" a été annulée";
        sendMail(process.env.ADMIN_EMAIL,'Annulation de reservation', text);
        res.status(200).send("annulé")
    }
    static adminAnnulation = async (req, res) =>{
        const reservationId = req.body.reservationId;
        const reservation = await ReservationModel.findById(reservationId);
        const logement = await LogementModel.findById(reservation.logement);
        console.log(logement.disponibility);
        for(let i = 0; i<logement.disponibility.length; i++){
            if(logement.disponibility[i].reservation == reservationId){
                logement.disponibility.splice(i,1);
                logement.save();
                break;
            }
        }
        reservation.state = 4;
        reservation.save();
        let text = "Votre réservation sur la résidence "+logement.name+" a été annulée";
        sendMail(reservation.email, 'Annulation de reservation', text);
        text = "L'annulation de la réseravtion de" +reservation.firstname+" "+reservation.lastname+" sur la résidence "+logement.name+ " a bien été pris en compte";
        sendMail(process.env.ADMIN_EMAIL,'Annulation de reservation', text);
        res.status(200).send("annulé")
    }
}
module.exports = { reservationController };