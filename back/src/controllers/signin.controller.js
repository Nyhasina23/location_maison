const {generateToken} =  require('../modules/generateToken.js')
const {UserModel} =  require('../models/user.model.js')
const {sha} =  require('../modules/sha256.js')
class signinController{
    static signin = async (req ,res ) => {
  
    const identity  = req.body.identity;
    let password = req.body.password;
    password = sha(password)
        const user = await UserModel.findOne({$or : [{username : identity} , {email : identity}]})
        if(user){
            if(user.password === password){
                //password correct
                const token = generateToken(user._id, user.username)
                res.status(200).send(token)
            }else{
                res.status(403).send("Identity or password incorrect");
            }  
        }else{
            res.status(403).send("Identity or password incorrect");

        }

    }
}
module.exports =  {signinController}