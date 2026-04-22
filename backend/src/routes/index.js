const express = require('express');
const router = express.Router();

const workoutRoutes = require('./workoutRoutes');
const exerciseRoutes = require('./exerciseRoutes');
//const userRoutes = require('./userRoutes'); // Exemplo futuro

// Aqui defines o prefixo de cada módulo
router.use('/workouts', workoutRoutes);
router.use('/exercises', exerciseRoutes);
//router.use('/users', userRoutes);

module.exports = router;