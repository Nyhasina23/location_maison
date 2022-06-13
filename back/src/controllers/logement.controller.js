const mongoose = require('mongoose')
const LogementModel = require("../models/logement.model")
const {ImageModel} = require('../models/image.model')
const dirname = require('../../getDirname')
const resizeImg = require('resize-img');
const fs = require('fs');
const { log } = require('console');
class LogementController{

    static create  = async (req , res) => {

        const newLogement = new LogementModel({
            name : req.body.name , 
            free_logement : req.body.free_logement , 
            free_date : req.body.free_date , 
            price : req.body.price
        })

        let imageFiles = []
        let imageBlurFiles = [];
        let blur = undefined;
        if (req.files) {
            for (let i = 0; i < req.files.length; i++) {
                const url = req.files[i].path;
                blur = dirname + '/public/blur/' + req.files[i].path.replace("public\\", '');
                console.log(blur);
                const imageBlured = await resizeImg(fs.readFileSync(url), {
                    width: 8
                });
                let image = await resizeImg(fs.readFileSync(url), {
                    width: 800
                })
                fs.writeFileSync(url, image);
                fs.writeFileSync(blur, imageBlured);
                imageFiles.push(url);
                imageBlurFiles.push(blur);
            }
        }

        newLogement.save((error , docs) => {
            if(error){
                res.status(500).send('error while saving logement')
            }else{

                let image = []
                for (let j = 0; j < imageFiles.length; j++ ){ 
                    let newImg = new ImageModel({
                        _id: new mongoose.Types.ObjectId(),
                        url: imageFiles[j].replace("public\\", ''),
                    })
                    image.push(newImg._id)
                    newImg.save();
                }
                newLogement.image = image
                newLogement.save()

                res.status(200).send(docs)

            }
        })

    }


}
module.exports = {LogementController}