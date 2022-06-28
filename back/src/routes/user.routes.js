const express =  require('express');
const router = express.Router();

const {UserController} = require('../controllers/user.controller')

router.get('/getOneUser' , UserController.getOneUser)
router.put('/update/' , UserController.update)

module.exports = router