const { ReservationModel } = require("../models/reservation.model");
const {UserModel} = require('../models/user.model')
class reservationController {
    static reserver = async (req, res) => {
        try {
            // const token = req.headers['authorization'].split(' ')[1];
            // const userId = token.userId;
            const user = await UserModel.findById('62a4e6440448de2994f26350')
            const firstname  = req.body.firstname ;
            const lastname = req.body.lastname;
            const logement = req.body.logement;
            const address = req.body.address;
            const contact = req.body.contact;
            const email = req.body.email;
            const nb_pers = req.body.nb_pers;
            const date_enter = req.body.date_enter;
            const date_leave = req.body.date_leave;
            const transport = req.body.transport;
            const hour_enter = req.body.hour_enter;
            const hour_leave = req.body.hour_leave;

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
                hour_leave
            })

            newReservation.save((docs) => {
                user.reservation.push(newReservation._id)
                user.save()
                res.send(docs)
            })

        } catch (error) {
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