const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exerciseController');

// Definimos o caminho relativo
router.post('/', exerciseController.createExercise);
router.get('/', exerciseController.getAllExercises);
router.get('/:id', exerciseController.getExexrciseById);
router.put('/:id', exerciseController.updateExercise);
router.delete('/:id', exerciseController.deleteExercise);

module.exports = router;