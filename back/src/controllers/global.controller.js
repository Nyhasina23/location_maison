const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const { ImageModel } = require('../models/image.model');

class globalContoller {
    static testToken = async (req, res) => {
        if (req.headers['authorization']) {
            const token = req.headers['authorization'].split(' ')[1];
            jwt.verify(token, process.env.SECRET, (err) => {
                if (err) {
                    res.status(401).send("your token is no more valid");
                } else {
                    res.status(200).send("everything is ok");
                }
            })
        } else {
            res.status(403).send("you must send token");
        }
    }
    static getImage = async (req, res) => {
        
        const idImage  = req.params.idImage;
        try {
            const image = await ImageModel.findById(idImage);
            const result = image.url.replace('public/','');
            res.status(200).send(result);
            console.log(result);
        } catch (error){
            console.log(error);
            res.status(200).send("");
        }
    }
    static getBlurImage = async (req, res) => {
        const idImage  = req.params.idImage;
        try {
            const image = await ImageModel.findById(idImage);
            console.log(image.url);
            res.status(200).send(image.url);
        } catch (error){
            res.status(200).send("");
            console.log(error);
        }
    }
}

module.exports = { globalContoller }