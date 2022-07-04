const mongoose = require('mongoose')
const { LogementModel } = require("../models/logement.model")
const { ImageModel } = require('../models/image.model')
const { ReservationModel } = require('../models/reservation.model')
const dirname = require('../../getDirname')
const resizeImg = require('resize-img');
const fs = require('fs');
class LogementController {

    static create = async (req, res) => {
        try {

            let imageFiles = []
            let imageBlurFiles = [];
            let blur = undefined;
            if (req.files) {
                for (let i = 0; i < req.files.length; i++) {
                    const url = req.files[i].path;
                    blur = dirname + '/public/blur/' + req.files[i].path.replace("public\\", '');
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

            let image = []
            for (let j = 0; j < imageFiles.length; j++) {
                let newImg = new ImageModel({
                    _id: new mongoose.Types.ObjectId(),
                    url: imageFiles[j].replace("public\\", ''),
                })
                image.push(newImg._id)
                newImg.save();
            }
            const name = req.body.name;
            const type = req.body.type;
            const descriptionFR = req.body.descriptionFR;
            const descriptionMG = req.body.descriptionMG;
            const descriptionEN = req.body.descriptionEN;
            const description = [descriptionFR, descriptionMG, descriptionEN];
            const surface = req.body.surface;
            const address = req.body.address;
            const chambre = req.body.chambre;
            const pers_max = req.body.pers_max;
            const modalite = req.body.modalite;
            const price = req.body.price;
            if (name == '' || type == '' || description == '' || surface == '' || address == ''
                || price == '' || image == ''
            ) {
                res.status(403).send()
            } else {
                const newLogement = new LogementModel({
                    name,
                    type,
                    description,
                    surface,
                    address,
                    chambre,
                    pers_max,
                    modalite,
                    price: [{
                        date: {
                            start: 'default',
                            end: 'default',
                            value: price
                        }
                    }],
                    images: image
                })
                newLogement.save()
                res.status(200).send('created')
            }

        } catch (error) {
            res.status(500).send('error server')
            console.log(error);
        }
    }

    static getAll = async (req, res) => {
        try {

            const logement = await LogementModel.find()
            if (logement) {
                res.status(200).send(logement)
                console.log("eto");
            } else {
                res.status(404).send('no logement')
            }

        } catch (error) {
            res.status(500).send(error)
        }
    }

    static getOneLogement = async (req, res) => {
        try {
            const idLog = req.params.idLog;
            const logement = await LogementModel.findById(idLog);
            if (logement) {
                res.status(200).send(logement)
            } else {
                res.status(404).send('no logement')
            }
        } catch (error) {
            res.status(500).send(error)
        }
    }


    static delete = async (req, res) => {
        try {
            const idLog = req.params.idLog;
            const logement = await LogementModel.findById(idLog)

            if (logement.images) {

                logement.images.forEach(imageID => {
                    ImageModel.findByIdAndDelete(imageID, (err, docs) => {
                        if (err) {
                            res.status(500).send('error')
                        } else {
                            if (logement.reservation) {
                                logement.reservation.forEach(async e => {
                                    await ReservationModel.findByIdAndDelete(e)
                                })
                            }
                            logement.remove()

                        }
                    })
                })
            }


        } catch (error) {
            console.log(error);
            res.status(500).send(error)
        }
    }

    static update = (req, res) => {
        try {
            const idLog = req.params.idLog;
            const name = req.body.name;
            const type = req.body.type;
            const descriptionFR = req.body.descriptionFR;
            const descriptionMG = req.body.descriptionMG;
            const descriptionEN = req.body.descriptionEN;
            const description = [descriptionFR, descriptionMG, descriptionEN];
            const chambre = req.body.chambre;
            const pers_max = req.body.pers_max;
            const surface = req.body.surface;
            const address = req.body.address;
            const price = req.body.price;
            if (name == '' || type == '' || description == '' || surface == '' || address == ''
                || price == ''
            ) {
                res.status(403).send()
            } else {
                LogementModel.findByIdAndUpdate(idLog, {
                    name,
                    type,
                    description,
                    chambre,
                    pers_max,
                    surface,
                    address,
                    price: [{
                        date: {
                            start: 'default',
                            end: 'default',
                            value: price
                        }
                    }],
                }, (err, docs) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send('error while updating logement')
                    } else {
                        res.status(200).send(docs)
                    }
                })
            }
        } catch (error) {
            res.status(500).send()

        }
    }

}
module.exports = { LogementController }