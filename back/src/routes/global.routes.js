const express = require('express');
const router = express.Router();
const {globalContoller} = require('../controllers/global.controller')

router.get('/testToken' , globalContoller.testToken);
router.get('/image/:idImage', globalContoller.getImage);
router.get('/blurImage/:idImage', globalContoller.getBlurImage);

module.exports = router;
