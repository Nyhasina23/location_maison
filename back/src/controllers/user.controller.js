const { generateToken } = require('../modules/generateToken.js');
const regex = require('../modules/regexp');
const { UserModel } = require('../models/user.model.js');
const { ReservationModel } = require('../models/reservation.model.js');
const { sha } = require('../modules/sha256.js');
const jwtdecode = require('jwt-decode')
const mongoose = require('mongoose');
class UserController {
    static search = async (req, res) => {

    }
    static edit = async (req, res) => {
        const _id = new mongoose.Types.ObjectId();
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const email = req.body.email;
        const isMale = req.body.isMale;
        let password = req.body.password;
        let address = req.body.address;
        let phoneNumber = req.body.phoneNumber;
        const regexChecked = checkRegex(firstname, lastname, email, password, phoneNumber);
        if (regexChecked) {
            password = sha(password);
            const user = await UserModel.findOne({ email });
            if (user) {
                res.status(401).send("email allready used");
            } else {
                let newUser = new UserModel({
                    _id,
                    firstname,
                    lastname,
                    email,
                    password,
                    isMale,
                    address,
                    phoneNumber
                })
                newUser.save();
                const token = generateToken(_id, email)
                res.status(200).send(token);
            }
        } else {
            res.status(403).send("regexp");
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
            if(!isYet){
                if(isValid){
                    res.status(200).send()
                }else{
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