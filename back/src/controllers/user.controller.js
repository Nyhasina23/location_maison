const { generateToken } = require('../modules/generateToken.js');
const regex = require('../modules/regexp');
const { UserModel } = require('../models/user.model.js');
const { sha } = require('../modules/sha256.js');
const mongoose = require('mongoose');
class userController {
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
        }else{
            res.status(403).send("regexp");
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
module.exports = { signupController }