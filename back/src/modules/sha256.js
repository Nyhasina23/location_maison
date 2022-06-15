const crypto = require('crypto');
const sha = (text) => {
    //creating hash object 
    const hash = crypto.createHash('sha256');
    //passing the data to be hashed
    data = hash.update(text, 'utf-8');
    //Creating the hash in the required format
    gen_hash = data.digest('hex');
    return gen_hash;
    
}
module.exports = {sha};