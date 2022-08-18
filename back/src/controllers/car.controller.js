const mongoose = require("mongoose");
const { CarModel } = require("../models/car.model");
const { ImageModel } = require("../models/image.model");
const dirname = require("../../getDirname");
const resizeImg = require("resize-img");
const fs = require("fs");
class CarController {
  static getAll = async (req , res) => {
      try {
        const allCars = await CarModel.find()
        res.status(200).send(allCars)  
      } catch (error) {
          console.log(error)
          res.status(500).send('Error while getting all cars')
      }
                
  }
  static getOneCar = async (req, res) => {
    try {
        const idCar = req.params.idCar;
        const car = await CarModel.findById(idCar);
        if (car) {
            res.status(200).send(car)
        } else {
            res.status(404).send('no car')
        }
    } catch (error) {
        res.status(500).send(error)
    }
}
  static create = async (req, res) => {
    try {
      let imageFiles = [];
      let imageBlurFiles = [];
      let blur = undefined;
      if (req.files) {
        for (let i = 0; i < req.files.length; i++) {
          const url = req.files[i].path;
          blur =
            dirname +
            "/public/blur/" +
            req.files[i].path.replace("public\\", "");
          const imageBlured = await resizeImg(fs.readFileSync(url), {
            width: 8,
          });
          let image = await resizeImg(fs.readFileSync(url), {
            width: 800,
          });
          fs.writeFileSync(url, image);
          fs.writeFileSync(blur, imageBlured);
          imageFiles.push(url);
          imageBlurFiles.push(blur);
        }
      }

      let image = [];
      for (let j = 0; j < imageFiles.length; j++) {
        let newImg = new ImageModel({
          _id: new mongoose.Types.ObjectId(),
          url: imageFiles[j].replace("public\\", ""),
        });
        image.push(newImg._id);
        newImg.save();
      }

      const type = req.body.type;
      const marque = req.body.marque;
      const description = req.body.description;
      const nbr_place = req.body.nbr_place;
      const price = req.body.price;
      if(type == '' || marque == '' || description == '' || nbr_place == '' || price == ''){
        res.status(403).send()
      }else{

        const newCar = new CarModel({
          type,
          marque,
          description,
          nbr_place,
          price,
          images: image,
        });
        await newCar.save();
        res.status(200).send("Car created");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Error while creating car");
    }
  };

  static update = async (req, res) => {
    try {
      const idCar = req.params.idCar;
      const car = await CarModel.findByIdAndUpdate(idCar, {
        type: req.body.type,
        marque: req.body.marque,
        description : req.body.description,
        nbr_place: req.body.nbr_place,
        price: req.body.price,
      });
      car.save();
      res.status(200).send("Car updated");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error while updating car");
    }
  };

  static delete = async (req , res) => {
      try {
        const idCar = req.params.idCar;
        const car = await CarModel.findByIdAndRemove(idCar)
        await car.remove()
        res.status(200).send('Car deleted')
      } catch (error) {
          console.log(error)
          res.status(500).send('Error while deleting car')
      }
      
  }
}

module.exports = { CarController };
