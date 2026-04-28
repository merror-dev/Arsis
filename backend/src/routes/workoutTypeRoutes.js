const express = require('express');
const router = express.Router();
const workoutTypeController = require('../controllers/workoutTypeController');
const authMiddleware = require('../middlewares/auth');

//auth
router.use(authMiddleware);

router.post('/', workoutTypeController.createWorkoutType);
router.get('/', workoutTypeController.getAllWorkoutTypes);
router.get('/:id', workoutTypeController.getWorkoutTypeById);
router.put('/:id', workoutTypeController.updateWorkoutType);
router.delete('/:id', workoutTypeController.deleteWorkoutType);

module.exports = router;
