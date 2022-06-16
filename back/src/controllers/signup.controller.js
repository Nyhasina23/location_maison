const { generateToken } = require('../modules/generateToken.js')
const { UserModel } = require('../models/user.model.js')
const { sha } = require('../modules/sha256.js')
const mongoose = require('mongoose')
class signupController {
    static signup = async (req, res) => {
        const _id = new mongoose.Types.ObjectId();
        const fullname = req.body.fullname;
        const email = req.body.email;
        const isMale = req.body.isMale;
        let password = req.body.password;
        password = sha(password)
        const user = await UserModel.findOne({ email });
        if (user) {
            res.status(403).send("email allready used");
        } else {
            let newUser = new UserModel({
                _id,
                fullname,
                email,
                password,
                isMale
            })
            newUser.save();
            const token = generateToken(_id, email)

            res.status(200).send(token);
        }
    }
}
module.exports = { signupController }