const express =  require('express');
const router = express.Router();

const {UserController} = require('../controllers/user.controller')

router.get('/getOneUser' , UserController.getOneUser)
router.get('/' , UserController.getAll );
router.post('/search',UserController.search);
router.put('/update/' , UserController.update)
router.delete('/:id' , UserController.delete)

module.exports = router