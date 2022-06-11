const jwt  = require ('jsonwebtoken')
function generateToken(id , username){
    const payload = {id , username};
    const token = jwt.sign(payload , process.env.SECRET , {expiresIn : '100000m'})
    return token
}
module.exports =  {generateToken};