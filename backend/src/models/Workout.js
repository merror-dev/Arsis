const mongoose = require('mongoose');
const {ExerciseSchema} = require('../models/Exercise')
const {WORKOUT_TYPES} = require('../utils/constants')

const WorkoutSchema = new mongoose.Schema({
  user: {
    type: Number,
    required: true
  },
  exercises: {
    type: [ExerciseSchema],
    required: true
  },
  type: {
    type: String,
    required: true
  }
  
}, {
  // Isto remove o __v (versão) e transforma _id em id no JSON final
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

module.exports = mongoose.model('Workout', WorkoutSchema);
