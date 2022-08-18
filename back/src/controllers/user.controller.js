const { generateToken } = require('../modules/generateToken.js');
const regex = require('../modules/regexp');
const { UserModel } = require('../models/user.model.js');
const { ReservationModel } = require('../models/reservation.model.js');
const { sha } = require('../modules/sha256.js');
const jwtdecode = require('jwt-decode');
const mongoose = require('mongoose');
const { sendMail } = require('../modules/emailSend');

class UserController {
    static getAllAdmin = async (req, res) => {
        try {
            const admins = await UserModel.find({ role: { $gt: 0 } });
            res.status(200).send(admins);
        } catch (error) {
            res.status(500).send();
            console.log(error);
        }
    }
    static setAdminStatus = async (req, res) => {
        try{
            const userId = req.params.userId;
            let user = await UserModel.findById(userId);
            if (user.role > 0) {
                user.role = 1;
                const text = "Votre rôle a été modifié";
                const isSent = await sendMail(user.email, 'Promotion', text);
                if(isSent){
                    user.save();
                    res.status(200).send("User role updated");
                }else{
                    res.status(401).send("Error while sending email");
                }
            } else {
                user.role = 1;
                const text = "Votre rôle a été modifié";
                const isSent = await sendMail(user.email, 'Promotion', text);
                if(isSent){
                    user.save();
                    res.status(200).send("User role updated");
                }else{
                    res.status(401).send("Error while sending email");
                }
            }
        }catch(error){
            res.status(500).send("internal server error")
            console.log(error)
        }
        

    }
    static search = async (req, res) => {
        const filter = req.params.filter;
        try {
            const users = await UserModel.find({ concat: { $regex: filter, $options: "i" } });
            res.status(200).send(users)
        } catch (error) {
            res.status(500).send("error while searching user");
            console.log(error);
        }
    }


    static getOneUser = async (req, res) => {
        try {
            const token = req.headers['authorization'].split(' ')[1];
            const userId = jwtdecode(token).id;
            const user = await UserModel.findById(userId)
            res.status(200).send(user)
        } catch (error) {
            res.status(500).send()
        }
    }


    static update = async (req, res) => {
        try {
            const firstname = req.body.firstname;
            const lastname = req.body.lastname;
            const email = req.body.email;
            let password = req.body.password;
            let address = req.body.address;
            let phoneNumber = req.body.phoneNumber;
            let concat = firstname + " " + lastname + " " + email + " " + address + " " + phoneNumber;
            let isYet = false;
            const token = req.headers['authorization'].split(' ')[1];
            const userId = jwtdecode(token).id;
            const user = await UserModel.findById(userId);
            let isValid = true;
            if (password == "") {
                password = user.password
            } else {
                if (regex.regexpPassword(password)) {
                    password = sha(password);
                } else {
                    isValid = false;
                }
            }
            if (isValid) {
                const regexChecked = checkRegexNoPassword(firstname, lastname, email, phoneNumber);
                if (regexChecked) {
                    await UserModel.findByIdAndUpdate(userId,
                        {
                            firstname,
                            lastname,
                            email,
                            address,
                            phoneNumber,
                            password,
                            concat,
                            new: true
                        })
                } else {
                    isValid = false;
                }
            } else {
                isYet = true;
                console.log("password");
                res.status(403).send("password")
            }
            if (!isYet) {
                if (isValid) {
                    res.status(200).send()
                } else {
                    console.log("not valid");
                    res.status(403).send()
                }
            }


        } catch (error) {
            res.status(500).send()
            console.log(error);
        }
    }

    static getAll = async (req, res) => {
        try {
            const user = await UserModel.find()
            res.status(200).send(user)
        } catch (error) {
            res.status(500).send()
        }
    }

    static delete = async (req, res) => {
        try {
            const idUser = req.params.id;
            let user = await UserModel.findByIdAndDelete(idUser)
            user.reservation.forEach(async e => {
                await ReservationModel.findByIdAndDelete(e)
            })
            res.status(200).send(user)
        } catch (error) {
            res.status(500).send()
        }
    }
}
const checkRegex = (firstname, lastname, email, password, phoneNumber) => {

    if (!regex.regexpPhone(phoneNumber)) {
        console.log("phone number");
        return false;
    }
    if (!regex.regexpPassword(password)) {
        console.log("password");

        return false;
    }
    if (!regex.regexpEmail(email)) {
        console.log("email");
        return false;
    }
    if (!regex.regexpName(lastname)) {
        console.log("lastname");
        return false;
    }

    if (!regex.regexpName(firstname)) {
        console.log("firstname");
        return false;
    }

    return true;

}

const checkRegexNoPassword = (firstname, lastname, email, phoneNumber) => {

    if (!regex.regexpPhone(phoneNumber)) {
        console.log("phone number");
        return false;
    }
    if (!regex.regexpEmail(email)) {
        console.log("email");
        return false;
    }
    if (!regex.regexpName(lastname)) {
        console.log("lastname");
        return false;
    }

    if (!regex.regexpName(firstname)) {
        console.log("firstname");
        return false;
    }

    return true;

}

module.exports = { UserController }