const { ReservationModel } = require("../models/reservation.model");
const {UserModel} = require('../models/user.model')
const jwtdecode = require('jwt-decode')
const  {sendMail} = require('../modules/emailSend')
class reservationController {
    static reserver = async (req, res) => {
        try {
            const token = req.headers['authorization'].split(' ')[1];
            const userId = jwtdecode(token).id;
            const user = await UserModel.findById(userId)
            const firstname  = user.firstname ;
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
                hour_leave ,
                reference ,
                typeTransfert ,
                payed
            })
   

            newReservation.save((docs) => {
                user.reservation.push(newReservation._id)
                user.save()

            })
            const text = 'reference : '+reference+' type Transfert : '+typeTransfert + ' Valeur : '+payed 
            sendMail(process.env.ADMIN_EMAIL , 'Payment reservation' , text)

        } catch (error) {
            console.log(error);
            res.status(500).send('error while make reservation')
        }

    }

    static getAllReservationUser = async (req , res) => {
        try {
            const user = await UserModel.findById('62a4e6440448de2994f26350')
            .populate('reservation')
            res.send(user.reservation)
        } catch (error) {
            res.status(500).send('Eroor while getting user reservations')
        }

    }

    static validReservation = async (req , res) => {
        const idRes = req.params.idRes;
        await ReservationModel.findByIdAndUpdate( idRes , {
            state : req.body.state , 
            new : true
        } , (error , docs) => {
            if(error){
                res.status(500).send('error while validating reservation');
            }else{
                res.send(docs);
            }
        })
    }

    static getAllReservation = async (req , res) => {
        await ReservationModel.find( (error , docs) => {
            if(error){
                res.status(500).send('error while geting all reservation');
            }else{
                res.send(docs);
            }
        })
    }
}
module.exports = { reservationController };