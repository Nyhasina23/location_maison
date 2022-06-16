const connexionDB = require('./modules/config/db.config');
const { authenticateToken } = require('./middlewares/authentificationToken');

connexionDB();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');


app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

const  signinRoutes = require('./routes/signin.routes.js')
const  signupRoutes = require('./routes/signup.routes.js')
const  logementRoutes = require('./routes/logement.routes.js')
app.use('/signin' , signinRoutes);
app.use('/signup' , signupRoutes);
app.use('/logement' , logementRoutes);
module.exports = {app}