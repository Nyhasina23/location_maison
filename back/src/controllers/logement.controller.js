const mongoose = require('mongoose')
const LogementModel = require("../models/logement.model")
const {ImageModel} = require('../models/image.model')
const dirname = require('../../getDirname')
const resizeImg = require('resize-img');
const fs = require('fs');
const { log } = require('console');
class LogementController{

    static create  = async (req , res) => {
        try {
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
        } catch (error) {
            res.status(500).send('error server')
        }
    }

    static getAll = async (req , res) => {
        try {

            const logement = await LogementModel.find()
            if(logement){
                res.status(200).send(logement)
            }else{
                res.status(404).send('no logement')
            }

        } catch (error) {
            res.status(500).send(error)
        }
    }

    static delete = async (req , res) => {
        try {
        const idLog = req.params.idLog;
        const logement = await LogementModel.findById(idLog)
        
        if(logement.image){

            logement.image.forEach( imageID => {
                ImageModel.findByIdAndDelete(imageID , (err , docs) => {
                    if(err){
                        res.status(500).send('error')
                    }else{
                        logement.remove()
                        res.send('deleted')
                    }
                })
             } )
        }
        logement.remove()

        } catch (error) {
            console.log(error);
            res.status(500).send(error)
        }
    }

    static update = (req , res) => {
        const idLog = req.params.idLog;

        LogementModel.findByIdAndUpdate(idLog , {
            name : req.body.name , 
            free_logement : req.body.free_logement ,
            free_date : req.body.free_date,
            price : req.body.price ,
        } , (err , docs) => {
            if(err){
                console.log(err);
                res.status(500).send('error while updating logement')
            }else{
                res.status(200).send(docs)
            }
        } )
    }

}
module.exports = {LogementController}