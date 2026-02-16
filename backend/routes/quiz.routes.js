const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quiz.controller');

router.get('/:mode', quizController.getQuiz);
router.post('/result', quizController.saveResult);

module.exports = router;
