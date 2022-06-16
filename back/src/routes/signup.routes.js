const express =  require('express');
const router = express.Router();

const {signupController} = require('../controllers/signup.controller.js')

router.post('/' , signupController.signup)

module.exports = router