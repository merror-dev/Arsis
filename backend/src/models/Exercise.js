const mongoose = require('mongoose');
const { EXERCISES_TYPES, METRICS } = require('../utils/constants');

const min_eazyness = 1
const max_eazyness = 5

const ExerciseSchema = new mongoose.Schema({
 name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  type: {
    type: String,
    enum: EXERCISES_TYPES,
    required: true
  },
  metrics: {
    type: String,
    enum: METRICS,
    required: true
  },
  feedback: {
    type: Number,
    min: [min_eazyness, 'Treino dificil 1'],
    max: [max_eazyness, 'Treino fácil 5'],
    default: 3,
    validate: [
      {
        validator: Number.isInteger,
        message: '{value} não é um numero inteiro'
      },
      {
        validator: (v) => min_eazyness < v || max_eazyness > v,
        message: '{value} its not a number between {min_eazyness} and {max_eazyness}'
      }
    ]
  },
  series: {
    type: Number,
    validate: [
      {
        validator: function(value) {
          if (this.type === 'REST') {
            return value === 0 || value === null;
          }
          // se for "EXERCISE" tem de ser maior que 0
          return value > 0
        },
        message: "Exercise of type rest can't have series"
      }
    ]
  },
  repetitions: {
    type: Number,
    default: null,
    validate: [
      {
        validator: function(value) {
          if (this.type === 'REST') {
            return value === 0 || value === null;
          }

          return value > 0
        },
        message: "Exercise of type rest can't have repeticions"
      }
    ]
  },
  duration: {
    type: Number,
    default: null
  },
  weight: {
    type: Number,
    default: null
  }
},{
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

module.exports = mongoose.model('Exercise', ExerciseSchema);
