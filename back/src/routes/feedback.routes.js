const express =  require('express');
const router = express.Router();

const {FeedbackController} = require('../controllers/feedback.controller.js')

router.post('/add', FeedbackController.create);
router.get('/', FeedbackController.getAll);

module.exports = router