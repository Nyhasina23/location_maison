const mongoose = require('mongoose')

const mongoURI = process.env.URI;

   const connexionDB = () => {
    try {
        mongoose.connect(mongoURI , {
            useNewUrlParser : true ,
            useUnifiedTopology : true
        } , (error) => {
            error ? console.log(error) : console.log('MongoDB Connected')
        })
    } catch (error) {
    console.log(error);
   }
}

module.exports = connexionDB