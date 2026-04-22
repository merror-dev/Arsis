const mongoose = require('mongoose');

const WorkoutTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  minRep: {
    type: Number,
    required: true
  },
  maxRep: {
    type: Number,
    required: true
  },
  minSeries: {
    type: Number,
    required: true
  },
  maxSeries: {
    type: Number,
    required: true
  }
});


module.exports = mongoose.model('WorkoutType', WorkoutTypeSchema);