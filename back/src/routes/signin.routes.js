const express =  require('express');
const router = express.Router();

const {signinController} = require('../controllers/signin.controller.js')

router.post('/' , signinController.signin);
router.get('/getRecoveryCode/:email', signinController.getRecoveryCode);
router.post('/checkRecoveryCode', signinController.checkRecoveryCode);
router.post('/recoverPassword', signinController.recoverPassword);

module.exports = router