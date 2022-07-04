const { FeedbackModel } = require("../models/feedback.model");
const jwtdecode = require('jwt-decode')
class FeedbackController {
    static create =  (req , res ) => {
        try {
            const token = req.headers['authorization'].split(' ')[1];
            const userId = jwtdecode(token).id;

            const feedback = new FeedbackModel({
                author : userId ,
                content : req.body.content ,
                note : req.body.note
            })

            feedback.save()
            res.status(200).send()

        } catch (error) {
            console.log(error);
            res.status(500).send()
        }
    } 

    static getAll = async  (req , res) => {
        try {
            const feedback = await FeedbackModel.find()
            res.status(200).send(feedback)
        
        } catch (error) {
            res.status(500).send()

        }
    }

}

module.exports = {FeedbackController}