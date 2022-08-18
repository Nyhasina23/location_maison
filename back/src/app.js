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
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

const  signinRoutes = require('./routes/signin.routes.js')
const  signupRoutes = require('./routes/signup.routes.js')
const  logementRoutes = require('./routes/logement.routes.js')
const  reservationRoutes = require('./routes/reservation.routes.js')
const  userRoutes = require('./routes/user.routes.js')
const  globalRoutes = require('./routes/global.routes.js')
const  feedbackRoutes = require('./routes/feedback.routes.js')
const carRoutes = require('./routes/car.routes')
const carReservationRoutes = require('./routes/carReservation.routes')
app.use('/signin' , signinRoutes);
app.use('/signup' , signupRoutes);
app.use('/logement' , logementRoutes);
app.use('/reservation' , reservationRoutes);
app.use('/user' , userRoutes);
app.use('/global',globalRoutes);
app.use('/feedback',feedbackRoutes);
app.use('/car',carRoutes);
app.use('/car/reservation',carReservationRoutes);

const path = require('path');
app.use('/public', express.static(path.join(__dirname, '/public')));
module.exports = {app}