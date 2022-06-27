const { generateToken } = require('../modules/generateToken.js');
const { UserModel } = require('../models/user.model.js');
const { sha } = require('../modules/sha256.js');
const { sendMail } = require('../modules/emailSend.js');
class signinController {
    static signin = async (req, res) => {
        const identity = req.body.identity;
        let password = req.body.password;
        password = sha(password);
        const user = await UserModel.findOne({ email: identity })
        if (user) {
            if (user.password === password) {
                //password correct
                const token = generateToken(user._id, user.email);
                res.status(200).send(token);
            } else {
                res.status(403).send("Identity or password incorrect");
            }
        } else {
            res.status(403).send("Identity or password incorrect");
        }
    }
    static getRecoveryCode = async (req, res) => {
        const email = req.params.email;
        const user = await UserModel.findOne({ email });
        if (user) {
            sendMail(email,"test","test")
            res.status(200).send("email sent");
        } else {
            res.status(403).send("Email does not exist");
        }
    }
    static checkRecoveryCode = async (req, res) => {

        const recoveryCode = req.body.recoveryCode;
        const email = req.body.email;
        const user = await UserModel.findOne({ email });
        if (user) {
            if (recoveryCode == user.password) {
                res.status(200).send("Valid recovery code");
            } else {
                res.status(403).send("Invalid recovery code");
            }

        } else {
            res.status(403).send("Email does not exist");
        }
    }
    static recoverPassword = async (req, res) => {
        const recoveryCode = req.body.recoveryCode;
        let password = req.body.password;
        const email = req.body.email;
        password = sha(password);

        const user = await UserModel.findOne({ email });
        if (user) {
            if (recoveryCode == user.password) {
                user.password = password;
                user.save();
                res.status(200).send("Valid recovery code");
            } else {
                res.status(403).send("Invalid recovery code");
            }
        } else {
            res.status(403).send("Email does not exist");
        }
    }
}
module.exports = { signinController }