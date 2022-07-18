const express =  require('express');
const router = express.Router();

const {UserController} = require('../controllers/user.controller')

router.get('/getOneUser' , UserController.getOneUser);
router.get('/' , UserController.getAll );
router.get('/getAllAdmin' , UserController.getAllAdmin );
router.get('/search/:filter',UserController.search);
router.put('/update/' , UserController.update);
router.get('/setAdminStatus/:userId' , UserController.setAdminStatus);

router.delete('/:id' , UserController.delete);

module.exports = router