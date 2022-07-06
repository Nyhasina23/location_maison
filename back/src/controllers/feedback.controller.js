const { FeedbackModel } = require("../models/feedback.model");
const jwtdecode = require('jwt-decode');
const { UserModel } = require("../models/user.model");
class FeedbackController {
    static create = async (req , res ) => {
        try {
            const token = req.headers['authorization'].split(' ')[1];
            const userId = jwtdecode(token).id;
            const user = await UserModel.findById(userId)
            const author =  user.firstname+' '+user.lastname
            const content = req.body.content;
            const note = req.body.note;
            console.log(content , ' - ' ,note);
            if(content == '' || note == ''){
                res.status(500).send()
            }else{
                const feedback = new FeedbackModel({
                    author ,
                    content,
                    note 
                })
    
                feedback.save()
                res.status(200).send()
            }

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