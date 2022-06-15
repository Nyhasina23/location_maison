const express =  require('express');
const router = express.Router();

const {signinController} = require('../controllers/signin.controller.js')

router.post('/' , signinController.signin)

module.exports = router