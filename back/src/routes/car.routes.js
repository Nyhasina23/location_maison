const express = require('express')
const router = express.Router()
const {CarController} = require('../controllers/car.controller')


const multer = require('multer')
const DIR = './public/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
      const fileName = Date.now().toString()+'.jpg';
      
      cb(null, fileName)
    }
  });

  var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
    }
  });
router.get('/' , CarController.getAll)
router.post('/add' , upload.array('images', 10) , CarController.create)
router.get('/getOneCar/:idCar' , CarController.getOneCar)
router.put('/:idCar' , CarController.update)
router.delete('/:idCar' , CarController.delete)
module.exports = router